<?php

declare(strict_types=1);

namespace App\Enum;

use App\Traits\HasEnumMethods;

enum AppCategories: string
{
    use HasEnumMethods;

    case CALENDAR = 'calendar';

    case CONFERENCE = 'conference';

    case PAYMENT = 'payment';

    case AUTOMATION = 'automation';

    case OTHER = 'other';

    public static function getAllTranslated()
    {
        return [
            self::CALENDAR->value => __('integrations.apps.categories.calendar'),
            self::CONFERENCE->value => __('integrations.apps.categories.conference'),
            //            self::PAYMENT->value => __('integrations.apps.categories.payment'),
            //            self::AUTOMATION->value => __('integrations.apps.categories.automation'),
            //            self::OTHER->value => __('integrations.apps.categories.other'),
        ];
    }
}
