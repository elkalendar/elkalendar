<?php

declare(strict_types=1);

namespace App\Actions\Availability;

use App\Models\Schedule;

class AddDayAction
{
    public function execute(Schedule $schedule, string $day): void
    {
        $schedule->intervals()->create([
            'day' => $day,
            'from' => '09:00',
            'to' => '17:00',
        ]);
    }
}
