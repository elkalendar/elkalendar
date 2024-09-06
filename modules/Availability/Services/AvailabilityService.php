<?php

declare(strict_types=1);

namespace Modules\Availability\Services;

use App\Models\Schedule;
use Carbon\Carbon;
use Modules\Booking\Repositories\BookingRepository;

class AvailabilityService
{
    public function __construct(
        private BookingRepository $bookingRepository,
        private SequenceService $sequenceService,
        private TimeslotService $timeslotService,
        private MonthService $monthService,
    ) {
    }

    public function getMonthAvailabilityTimeSlots(Carbon $month, int $durationInMinutes, Schedule $schedule): array
    {
        $scheduleDayNames = $schedule->getScheduleDayNames();

        if ($scheduleDayNames->isEmpty()) {
            return [];
        }

        $weekdayPeriods = $schedule->getDayPeriods();

        $monthAvailability = $this->monthService->getMonthAvailableDates(
            $month->copy()->startOfMonth(),
            $scheduleDayNames,
            $weekdayPeriods,
            $schedule->timezone,
        );

        $bookingsThisMonth = $this->bookingRepository
            ->getBookingsFilteredByDates(array_keys($monthAvailability))
            ->groupBy('date');

        foreach ($monthAvailability as $date => $datePeriods) {
            $dayBookings = $bookingsThisMonth[$date] ?? [];

            $dayAvailabilitySequence = $this->sequenceService->generateSequence($datePeriods);

            if (! $dayBookings) {
                $monthAvailability[$date] = $dayAvailabilitySequence;

                continue;
            }

            $bookingPeriods = [];

            foreach ($dayBookings as $booking) {
                $bookingPeriods[] = $booking->asPeriod(Carbon::parse($date)->month);
            }

            $bookingSequence = $this->sequenceService->generateSequence($bookingPeriods);

            $diff = $dayAvailabilitySequence->subtract($bookingSequence);

            $monthAvailability[$date] = $diff;
        }

        return $this->timeslotService->generateTimeslotsForDates($monthAvailability, $durationInMinutes);
    }
}
