<?php

declare(strict_types=1);

namespace App\Enum;

class Defaults
{
    public const DATE_FORMAT = 'Y-m-d';

    public const TIMESTAMP_FORMAT = 'Y-m-d h:i:s';

    public const TIMESTAMP_FORMAT_POST = 'Y-m-d h:i';

    public const TIMESTAMP_FORMAT_QUEUE_NAME = 'Y-m-d_h:i';

    public const LANG_EN = 'en';

    public const LANG_AR = 'ar';

    public const DAY_SHORT_SUN = 'sun';

    public const DAY_SHORT_MON = 'mon';

    public const DAY_SHORT_TUE = 'tue';

    public const DAY_SHORT_WED = 'wed';

    public const DAY_SHORT_THU = 'thu';

    public const DAY_SHORT_FRI = 'fri';

    public const DAY_SHORT_SAT = 'sat';

    public const DAY_FULL_SUN = 'sunday';

    public const DAY_FULL_MON = 'monday';

    public const DAY_FULL_TUE = 'tuesday';

    public const DAY_FULL_WED = 'wednesday';

    public const DAY_FULL_THU = 'thursday';

    public const DAY_FULL_FRI = 'friday';

    public const DAY_FULL_SAT = 'saturday';

    public const LANGUAGES = [
        self::LANG_EN,
        self::LANG_AR,
    ];

    public const DAYS_SHORT = [
        self::DAY_SHORT_SUN,
        self::DAY_SHORT_MON,
        self::DAY_SHORT_TUE,
        self::DAY_SHORT_WED,
        self::DAY_SHORT_THU,
        self::DAY_SHORT_FRI,
        self::DAY_SHORT_SAT,
    ];

    public const DAYS_FULL = [
        self::DAY_FULL_SUN,
        self::DAY_FULL_MON,
        self::DAY_FULL_TUE,
        self::DAY_FULL_WED,
        self::DAY_FULL_THU,
        self::DAY_FULL_FRI,
        self::DAY_FULL_SAT,
    ];

    public const THEME_LIGHT = 'light';

    public const THEME_DARK = 'dark';

    public const THEME_SYSTEM = 'system';

    public const THEMES = [
        self::THEME_LIGHT,
        self::THEME_DARK,
        self::THEME_SYSTEM,
    ];
}
