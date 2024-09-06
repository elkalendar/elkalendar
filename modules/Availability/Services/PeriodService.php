<?php

declare(strict_types=1);

namespace Modules\Availability\Services;

use Carbon\Carbon;
use League\Period\Period;

class PeriodService
{
    /**
     * @return Carbon[]
     */
    public function generateTimeslots(Period $period, int $durationInMinutes): array
    {
        $timeslots = [];

        foreach ($period->splitForward($durationInMinutes.' minutes') as $timeslot) {
            $timeslots[] = Carbon::parse($timeslot->startDate);
        }

        return $timeslots;
    }
}
