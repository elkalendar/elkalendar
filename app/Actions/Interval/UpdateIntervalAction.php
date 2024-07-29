<?php

declare(strict_types=1);

namespace App\Actions\Interval;

use App\Models\Schedule;
use App\Services\IntervalService;

class UpdateIntervalAction
{
    public function __construct(public IntervalService $intervalService)
    {
    }

    public function execute(Schedule $schedule, string $day, string $from, string $to): void
    {
        $interval = $schedule->intervals()->where('day', $day)->firstOrFail();

        $interval->update([
            'from' => $from,
            'to' => $to,
        ]);
    }
}
