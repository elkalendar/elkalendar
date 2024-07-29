<?php

declare(strict_types=1);

namespace App\Enum;

enum ZoomMeetingTypes: int
{
    case MEETING_TYPE_INSTANT = 1;

    /**
     * In most cases this is the type of meeting we want to create.
     */
    case MEETING_TYPE_SCHEDULE = 2;
    case MEETING_TYPE_RECURRING = 3;
    case MEETING_TYPE_FIXED_RECURRING_FIXED = 8;
}
