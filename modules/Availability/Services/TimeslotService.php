<?php

declare(strict_types=1);

namespace Modules\Availability\Services;

use League\Period\Sequence;

class TimeslotService
{
    public function __construct(private readonly SequenceService $sequenceService)
    {
    }

    /**
     * @param  Sequence[]  $dates
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
