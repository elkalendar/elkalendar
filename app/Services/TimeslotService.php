<?php

namespace App\Services;

use League\Period\Sequence;

class TimeslotService
{
    public function __construct(private SequenceService $sequenceService)
    {
    }

    /**
     * @param Sequence[] $dates
     */
    public function generateTimeslotsForDates(array $dates, int $durationInMinutes): array
    {
        $timeslots = [];

        foreach ($dates as $date => $sequence) {
            $timeslots[$date] = $this->sequenceService->generateTimeslots($sequence, $durationInMinutes);
        }

        return $timeslots;
    }
}
