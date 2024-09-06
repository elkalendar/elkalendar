<?php

declare(strict_types=1);

namespace Modules\Availability\Services;

use App\Enum\Defaults;

class IntervalService
{
    public static function getDefaultScheduleIntervals(): array
    {
        return [
            Defaults::DAY_FULL_MON => [
                [
                    'from' => '09:00',
                    'to' => '17:00',
                ],
            ],
            Defaults::DAY_FULL_TUE => [
                [
                    'from' => '09:00',
                    'to' => '17:00',
                ],
            ],
            Defaults::DAY_FULL_WED => [
                [
                    'from' => '09:00',
                    'to' => '17:00',
                ],
            ],
            Defaults::DAY_FULL_THU => [
                [
                    'from' => '09:00',
                    'to' => '17:00',
                ],
            ],
            Defaults::DAY_FULL_SUN => [
                [
                    'from' => '09:00',
                    'to' => '17:00',
                ],
            ],
        ];
    }
}
