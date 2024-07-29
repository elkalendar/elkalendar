<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Repositories\BookingRepository;
use App\Repositories\UserRepository;
use App\Services\EventLocationService;
use App\Services\NewAvailability\AvailabilityService;
use App\Services\TimezoneService;
use Carbon\Carbon;
use Inertia\Inertia;

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

    public function __invoke(string $username, string $slug)
    {
        $month = $this->getMonth();

        $user = $this->userRepository->getUserByUsername($username, ['events']);
        $event = $user->events->where('slug', $slug)->firstOrFail();

        $event->user = $user;

        $timeslotsByDate = $this->availabilityService->getMonthAvailabilityTimeSlots(
            $month,
            $event->duration,
            $event->schedule,
        );

        $timezones = $this->timezoneService->getTimezones();

        return Inertia::render('Events/Public/BookNew', [
            'month' => $month->toIso8601String(),
            'host' => new \App\Http\Resources\HostResource($user),
            'timezones' => $timezones,
            'event' => \App\Http\Resources\EventResource::make($event),
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
