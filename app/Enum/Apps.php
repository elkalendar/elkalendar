<?php

declare(strict_types=1);

namespace App\Enum;

class Apps
{
    public static function All(): array
    {
        return [
            //            [
            //                'key' => Integrations::PROVIDER_GOOGLE_CALENDAR,
            //                'category' => AppCategories::CALENDAR->value,
            //                'name' => __('integrations.apps.'. Integrations::PROVIDER_GOOGLE_CALENDAR . '.name'),
            //                'description' => __('integrations.apps.'. Integrations::PROVIDER_GOOGLE_CALENDAR . '.description'),
            //                'icon' => Integrations::PROVIDER_GOOGLE_CALENDAR . '.svg',
            //            ],
            //            [
            //                'key' => Integrations::PROVIDER_GOOGLE_MEET,
            //                'category' => AppCategories::CONFERENCE->value,
            //                'name' => __('integrations.apps.'. Integrations::PROVIDER_GOOGLE_MEET . '.name'),
            //                'description' => __('integrations.apps.'. Integrations::PROVIDER_GOOGLE_MEET . '.description'),
            //                'icon' => Integrations::PROVIDER_GOOGLE_MEET . '.svg',
            //            ],
            [
                'key' => Integrations::PROVIDER_ZOOM,
                'category' => AppCategories::CONFERENCE->value,
                'name' => __('integrations.apps.'.Integrations::PROVIDER_ZOOM.'.name'),
                'description' => __('integrations.apps.'.Integrations::PROVIDER_ZOOM.'.description'),
                'icon' => Integrations::PROVIDER_ZOOM.'.svg',
            ],
        ];
    }
}
