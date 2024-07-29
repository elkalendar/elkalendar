<?php

declare(strict_types=1);

namespace App\Services;

use App\Enum\Defaults;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Collection;
use League\Period\Period;

class MonthService
{
    /**
     * @return Carbon[]
     */
    public static function generateDatesByDayNames(
        Carbon $month,
        Collection $dayNames,
    ): array {
        $dates = [];
        $startOfTheMonth = $month->startOfMonth()->toDateTimeString();
        $endOfTheMonth = $month->endOfMonth()->toDateTimeString();

        $period = CarbonPeriod::dates($startOfTheMonth, $endOfTheMonth);

        foreach ($period as $day) {
            if ($dayNames->contains(strtolower($day->format('l')))) {
                $dates[] = $day;
            }
        }

        return $dates;
    }

    public function getMonthAvailableDates(
        Carbon $month,
        Collection $dayNames,
        array $weekdayPeriods,
        string $timezone,
    ): array {
        $dates = [];

        foreach (MonthService::generateDatesByDayNames($month, $dayNames) as $availableDate) {
            if ($availableDate->isPast()) {
                continue;
            }

            $dayName = strtolower($availableDate->format('l'));
            $dayPeriods = $weekdayPeriods[$dayName];

            foreach ($dayPeriods as $period) {
                $startTime = Carbon::parse(
                        $availableDate->format(Defaults::DATE_FORMAT) . ' ' . $period->startDate->format('H:i')
                    );
                $startTime = $startTime->shiftTimezone($timezone)->setTimezone('UTC');

                $endTime = Carbon::parse(
                    $availableDate->format(Defaults::DATE_FORMAT) . ' ' . $period->endDate->format('H:i')
                );
                $endTime->shiftTimezone($timezone)->setTimezone('UTC');

                $finalPeriod = Period::fromDate($startTime, $endTime);
                $dates[$availableDate->format(Defaults::DATE_FORMAT)][] = $finalPeriod;
            }
        }

        return $dates;
    }
}
