<?php

declare(strict_types=1);

namespace Modules\User\Listeners;

use App\Models\ScheduleInterval;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Arr;
use Modules\Availability\Services\IntervalService;

class BootstrapUser
{
    public function handle(Registered $event)
    {
        $schedule = $event->user->schedules()->create([
            'name' => __('defaults.schedule_name'),
            'timezone' => $event->user->settings()->get('timezone'),
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

        $event->user->events()->create([
            'schedule_id' => $schedule->id,
            'name' => [
                'ar' => __('defaults.event_name', locale: 'ar'),
                'en' => __('defaults.event_name', locale: 'en'),
            ],
            'slug' => 'free-consultation',
            'description' => [
                'ar' => __('defaults.event_description', locale: 'ar'),
                'en' => __('defaults.event_description', locale: 'en'),
            ],
            'color' => generateColorHex(),
            'duration' => Arr::random([15, 30, 45, 60, 90]),
        ]);
    }
}
