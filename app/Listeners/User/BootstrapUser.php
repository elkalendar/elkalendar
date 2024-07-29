<?php

declare(strict_types=1);

namespace App\Listeners\User;

use App\Enum\EventLocationTypes;
use App\Models\ScheduleInterval;
use App\Services\ColorService;
use App\Services\IntervalService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Arr;

class BootstrapUser
{
    public function handle(Registered $event)
    {
        $schedule = $event->user->schedules()->create([
            'name' => 'ساعات العمل',
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

        $event = $event->user->events()->create([
            'schedule_id' => $schedule->id,
            'name' => [
                'ar' => 'استشارة مجانية',
                'en' => 'Free consultation',
            ],
            'slug' => 'free-consultation',
            'description' => [
                'ar' => 'انضم إلي لنتحدث سوياً عن كيف يمكننا تحسين أداء عملك في الفترة المقبلة.',
                'en' => 'Join me for a free consultation session where we discuss how to improve things.',
            ],
            'color' => ColorService::generateHex(),
            'duration' => Arr::random([15, 30, 45, 60, 90]),
        ]);

        $event->locations()->create([
            'type' => EventLocationTypes::TEXT,
            'settings' => [
                'text' => 'عنوان شركتنا',
            ],
            'position' => 1,
        ]);
    }
}
