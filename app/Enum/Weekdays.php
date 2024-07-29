<?php

declare(strict_types=1);

namespace App\Enum;

class Weekdays
{
    public const ALL = [
        0 => Defaults::DAY_FULL_SUN,
        1 => Defaults::DAY_FULL_MON,
        2 => Defaults::DAY_FULL_TUE,
        3 => Defaults::DAY_FULL_WED,
        4 => Defaults::DAY_FULL_THU,
        5 => Defaults::DAY_FULL_FRI,
        6 => Defaults::DAY_FULL_SAT,
    ];
}
