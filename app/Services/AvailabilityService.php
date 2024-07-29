<?php

declare(strict_types=1);

namespace App\Services;

use App\Enum\Defaults;
use App\Models\Event;
use App\Models\Schedule;
use App\Repositories\BookingRepository;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use League\Period\Period;
use League\Period\Sequence;

class AvailabilityService
{
    public function __construct(
        private readonly BookingRepository $bookingRepository,
    ) {
    }

    public function getMonthAvailabilityPeriods(Schedule $schedule, Carbon $month): array
    {
        $days = [];
        $scheduleDayNames = $schedule->intervals->pluck('day')->unique();
        $availableDaysInMonth = $this->getAvailableDatesInMonth($month, $scheduleDayNames->toArray());
        $bookingsThisMonth = $this->bookingRepository
            ->getBookingsFilteredByDates($availableDaysInMonth)
            ->groupBy('date');

        $availabilityByWeekDay = $this->getAvailabilityByDayName($schedule);

        // loop over available days and check every day's availability
        foreach ($availableDaysInMonth as $availableDate) {
            $dayName = strtolower(Carbon::parse($availableDate)->format('l'));
            $dayBookings = $bookingsThisMonth[$availableDate] ?? [];

            if (! $dayBookings) {
                $dayPeriods = $availabilityByWeekDay[$dayName];

                foreach ($dayPeriods as $key => $period) {
                    $startD = Carbon::parse($period->startDate)->setDateFrom(Carbon::parse($availableDate));
                    $endD = Carbon::parse($period->endDate)->setDateFrom(Carbon::parse($availableDate));

                    $dayPeriods[$key] = Period::fromDate($startD, $endD);
                }

                $days[$availableDate] = $dayPeriods;

                continue;
            }

            $dayAvailabilitySequence = new Sequence();
            foreach ($availabilityByWeekDay[$dayName] as $pd) {
                $startD = Carbon::parse($pd->startDate)->setDateFrom(Carbon::parse($availableDate));
                $endD = Carbon::parse($pd->endDate)->setDateFrom(Carbon::parse($availableDate));

                $dayAvailabilitySequence->push(Period::fromDate($startD, $endD));
            }

            $bookingSequence = new Sequence();
            foreach ($dayBookings as $booking) {
                $bookingSequence->push($booking->asPeriod(Carbon::parse($availableDate)->month));
            }

            $diff = $dayAvailabilitySequence->subtract($bookingSequence);

            $days[$availableDate] = $diff;
        }

        return $days;
    }

    public function getAvailableDatesInMonth(Carbon $month, array $dayNames): array
    {
        $days = [];
        $startDay = now()->today()->toDateTimeString();
        $endDay = $month->endOfMonth()->toDateTimeString();

        $period = CarbonPeriod::dates($startDay, $endDay);

        foreach ($period as $day) {
            if (in_array(strtolower($day->format('l')), $dayNames)) {
                $days[] = $day->format(Defaults::DATE_FORMAT);
            }
        }

        return $days;
    }

    public function getAvailabilityByDayName(Schedule $schedule): array
    {
        $availabilityByWeekDay = [];

        foreach ($schedule->intervals as $userDefinedInterval) {
            $dayName = $userDefinedInterval->day;
            $availabilityByWeekDay[$dayName][] = $userDefinedInterval->asPeriod();
        }

        return $availabilityByWeekDay;
    }

    public function getAvailableSlotsForAvailableDaysAndPeriods(Event $event, array $availableDays): array
    {
        $timeslotsByDate = [];
        foreach ($availableDays as $date => $periods) {
            /**
             * @var Period $period
             */
            foreach ($periods as $period) {
                foreach ($period->splitForward($event->break_before + $event->duration + $event->break_after.' minutes') as $timeslot) {
                    $timeslotsByDate[$date][] = Carbon::parse($timeslot->startDate)->format('H:i');
                }
            }
        }

        return $timeslotsByDate;
    }
}
