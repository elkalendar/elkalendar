<?php

declare(strict_types=1);

namespace Modules\Availability\Services;

use App\Enum\Defaults;
use App\Models\Event;
use App\Models\Schedule;
use Carbon\Carbon;
use Illuminate\Support\Str;
use League\Period\Period;
use Modules\Booking\Repositories\BookingRepository;

class DayService
{
    public function __construct(
        private readonly BookingRepository $bookingRepository,
        private readonly SequenceService $sequenceService,
        private readonly TimeslotService $timeslotService,
    ) {
    }

    public function getDayAvailability(Carbon $date, Schedule $schedule, Event $event): array
    {
        $dayName = Str::lower($date->format('l'));
        $scheduleIntervals = $schedule->intervals()->where('day', $dayName)->get()->map(function ($interval) use ($date) {
            $start = Carbon::parse($date->format(Defaults::DATE_FORMAT).' '.$interval->from);
            $end = Carbon::parse($date->format(Defaults::DATE_FORMAT).' '.$interval->to);

            return Period::fromDate($start, $end);
        });

        if ($scheduleIntervals->isEmpty()) {
            return [];
        }

        $dayBookings = $this->bookingRepository->getEventBookingsByDate($event->id, $date, true);

        $dayBookingsSequence = $this->sequenceService->generateSequence($dayBookings->toArray());
        $dayAvailabilitySequence = $this->sequenceService->generateSequence($scheduleIntervals->toArray());

        $diff = $dayAvailabilitySequence->subtract($dayBookingsSequence);

        return $this->timeslotService->generateTimeslotsForDates([$date->format(Defaults::DATE_FORMAT) => $diff], $event->duration);
    }
}
