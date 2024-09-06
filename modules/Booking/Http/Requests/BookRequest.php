<?php

declare(strict_types=1);

namespace Modules\Booking\Http\Requests;

use App\Enum\EventLocationTypes;
use App\Exceptions\EventNotFoundException;
use App\Exceptions\UserNotFoundException;
use App\Models\Event;
use App\Models\User;
use App\Rules\OnlyUnicodeLetters;
use Carbon\Carbon;
use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use Modules\Booking\Rules\Emails;
use Modules\Availability\Services\AvailabilityService;
use Modules\User\Repositories\UserRepository;

class BookRequest extends FormRequest
{
    public User $user;

    public Event $event;

    public function __construct(
        private readonly UserRepository $userRepository,
        private readonly AvailabilityService $availabilityService
    ) {
        parent::__construct();
    }

    public function authorize()
    {
        return true;
    }

    /**
     * @throws EventNotFoundException
     * @throws UserNotFoundException
     */
    public function rules()
    {
        $this->user = $this->getTheUserByUsername();
        $this->event = $this->getEventBySlug();

        $rules = [
            'date' => 'required|date_format:Y-m-d',
            'slot' => [
                'required',
                'date',
                'after_or_equal:now',
                function (string $attribute, mixed $value, Closure $fail) {
                    $userTimeslot = Carbon::parse($this->get('slot'));
                    $timeslotsByDate = $this->availabilityService->getMonthAvailabilityTimeSlots(
                        Carbon::parse($this->get('slot'))->copy()->startOfMonth(),
                        $this->event->duration,
                        $this->event->schedule,
                    );

                    $timeslotsCollection = collect($timeslotsByDate)->flatten(1);

                    $timeslots = $timeslotsCollection->filter(function (Carbon $timeslot) use ($userTimeslot) {
                        return $timeslot->equalTo($userTimeslot);
                    });

                    if ($timeslots->isEmpty()) {
                        $fail(__('bookings.errors.slot_already_booked'));
                    }
                },
            ],
            'name' => [
                'required',
                'string',
                'max:255',
                'min:2',
                new OnlyUnicodeLetters(),
            ],
            'location' => [
                'nullable',
                new Enum(EventLocationTypes::class),
            ],
            'email' => 'required|string|email|max:255',
            'guests' => new Emails(),
            'timezone' => 'timezone',
        ];

        if ($this->event->locations->count() > 0) {
            $rules['location'] = [
                'required',
                new Enum(EventLocationTypes::class),
            ];
        }

        if ($this->get('location') === EventLocationTypes::IN_PERSON_GUEST->value) {
            $rules['locationData.address'] = [
                'required',
                'string',
                'max:150',
                'min:3',
            ];
        }

        return $rules;
    }

    /**
     * @throws UserNotFoundException
     */
    public function getTheUserByUsername(): User
    {
        return $this->userRepository->getUserByUsername($this->route('username'), 'events');
    }

    /**
     * @throws EventNotFoundException
     */
    public function getEventBySlug(): Event
    {
        $event = $this->user->events()
            ->with(['locations', 'schedule'])
            ->where('slug', $this->route('slug'))
            ->first();

        if (! $event) {
            throw new EventNotFoundException(
                'Event not found: '.$this->route('slug').' for user '.$this->user->username
            );
        }

        return $event;
    }
}
