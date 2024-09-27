<?php

declare(strict_types=1);

namespace Modules\Availability\Actions;

use App\Models\Schedule;

class UpdateScheduleAction
{
    public function execute(
        Schedule $schedule,
        string $name,
        string $timezone,
        bool $isDefault = false,
    ): void {
        if ($isDefault === true) {
            auth()->user()->schedules()->update([
                'is_default' => false,
            ]);
        }

        $schedule->update([
            'name' => $name,
            'timezone' => $timezone,
            'is_default' => $isDefault === true,
        ]);
    }
}
