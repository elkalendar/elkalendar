<?php

declare(strict_types=1);

namespace Modules\Public\Http\Controllers;

use App\Exceptions\UserNotFoundException;
use App\Services\TimezoneService;
use Carbon\Carbon;
use Inertia\Inertia;
use Modules\Availability\Services\AvailabilityService;
use Modules\Booking\Repositories\BookingRepository;
use Modules\Event\Services\EventLocationService;
use Modules\User\Repositories\UserRepository;

class ShowEventController
{
    public function __construct(
        public UserRepository $userRepository,
        public BookingRepository $bookingRepository,
        public EventLocationService $eventLocationService,
        public AvailabilityService $availabilityService,
        public TimezoneService $timezoneService,
    ) {
    }

    /**
     * @throws UserNotFoundException
     */
    public function __invoke(string $username, string $slug)
    {
        $month = $this->getMonth();

        $user = $this->userRepository->getUserByUsername($username, 'events');
        $event = $user->events->where('slug', $slug)->firstOrFail();

        $event->user = $user;

        $timeslotsByDate = $this->availabilityService->getMonthAvailabilityTimeSlots(
            $month,
            $event->duration,
            $event->schedule,
        );

        $timezones = $this->timezoneService->getTimezones();

        return Inertia::render('Events/Public/Book', [
            'month' => $month->toIso8601String(),
            'host' => new \Modules\Common\Http\Resources\HostResource($user),
            'timezones' => $timezones,
            'event' => \Modules\Event\Http\Resources\EventResource::make($event),
            'availability' => $timeslotsByDate,
            'currentMonth' => $month->toIso8601String(),
        ]);
    }

    private function getMonth()
    {
        $month = now()->firstOfMonth();

        if (request()->has('month') && preg_match('/^\d{4}-\d{2}$/', request('month')) !== 0) {
            $month = Carbon::parse(request('month'));

            if ($month->isPast()) {
                $month = now()->firstOfMonth();
            }
        }

        return $month;
    }
}
