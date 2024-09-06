<?php

declare(strict_types=1);

namespace Modules\Availability\Services;

use Carbon\Carbon;
use League\Period\Period;
use League\Period\Sequence;

class SequenceService
{
    public function __construct(private PeriodService $periodService)
    {
    }

    public function generateSequence(array $periods): Sequence
    {
        $sequence = new Sequence();

        foreach ($periods as $period) {
            $startD = Carbon::parse($period->startDate);
            $endD = Carbon::parse($period->endDate);
            $sequence->push(Period::fromDate($startD, $endD));
        }

        return $sequence;
    }

    /**
     * @return Carbon[]
     */
    public function generateTimeslots(Sequence $sequence, int $durationInMinutes): array
    {
        $timeslots = [];

        foreach ($sequence as $period) {
            foreach ($this->periodService->generateTimeslots($period, $durationInMinutes) as $timeslot) {
                $timeslots[] = $timeslot;
            }
        }

        return $timeslots;
    }
}
