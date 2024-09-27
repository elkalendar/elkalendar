<?php

declare(strict_types=1);

namespace Modules\Availability\Actions;

use App\Models\ScheduleInterval;
use Modules\Availability\Events\ScheduleCreated;
use Modules\Availability\Services\IntervalService;

class CreateScheduleAction
{
    public function execute(string $name)
    {
        $isDefault = false;

        if (auth()->user()->schedules()->count() < 1) {
            $isDefault = 1;
        }

        $schedule = auth()->user()->schedules()->create([
            'name' => $name,
            'timezone' => config('availability.default_timezone'),
            'is_default' => $isDefault,
        ]);

        foreach (IntervalService::getDefaultScheduleIntervals() as $day => $intervals) {
            foreach ($intervals as $interval) {
                ScheduleInterval::create([
                    'schedule_id' => $schedule->id,
                    'day' => $day,
                    'from' => $interval['from'],
                    'to' => $interval['to'],
                ]);
            }
        }

        event(new ScheduleCreated($schedule));

        return $schedule;
    }
}
