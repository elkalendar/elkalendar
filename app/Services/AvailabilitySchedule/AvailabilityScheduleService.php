<?php

declare(strict_types=1);

namespace App\Services\AvailabilitySchedule;

use App\Exceptions\OnlyScheduleDeleteException;
use App\Models\Event;
use App\Models\Schedule;
use App\Models\ScheduleInterval;
use App\Services\IntervalService;

class AvailabilityScheduleService
{
    public function create(string $name)
    {
        $schedule = auth()->user()->schedules()->create([
            'name' => $name,
            'timezone' => 'Africa/Cairo',
            'is_default' => 0,
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

        return $schedule;
    }

    /**
     * @throws OnlyScheduleDeleteException
     */
    public function delete(Schedule $schedule)
    {
        $schedules = auth()->user()->schedules();

        if ($schedules->count() === 1) {
            throw new OnlyScheduleDeleteException;
        }

        $firstDifferentSchedule = auth()->user()->schedules()->whereNot('id', $schedule->id)->first();

        if ($schedule->is_default === 1) {
            $firstDifferentSchedule->update([
                'is_default' => 1,
            ]);
        }

        Event::query()->where('schedule_id', $schedule->id)->update([
            'schedule_id' => $firstDifferentSchedule->id,
        ]);

        $schedule->delete();
    }

    public function update(Schedule $schedule, array $data)
    {
        if ($data['isDefault'] === true) {
            auth()->user()->schedules()->update([
                'is_default' => false,
            ]);
        }

        $schedule->update([
            'name' => $data['name'],
            'timezone' => $data['timezone'],
            'is_default' => $data['isDefault'] === true,
        ]);
    }
}
