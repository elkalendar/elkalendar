<?php

declare(strict_types=1);

namespace App\Actions\Availability;

use App\Models\Schedule;

class RemoveDayAction
{
    public function execute(Schedule $schedule, string $day)
    {
        $schedule->intervals()->where('day', $day)->delete();
    }
}
