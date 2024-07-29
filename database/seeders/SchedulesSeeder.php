<?php

namespace Database\Seeders;

use App\Models\Schedule;
use App\Models\ScheduleInterval;
use App\Services\IntervalService;
use Illuminate\Database\Seeder;

class SchedulesSeeder extends Seeder
{
    public function __construct(private readonly \Faker\Generator $faker)
    {
    }

    public function run()
    {
        for ($i = 1; $i <= 11; $i++) {
            $schedule = Schedule::create([
                'user_id' => $i,
                'name' => 'Working Hours',
                'timezone' => $this->faker->timezone(),
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
        }
    }
}
