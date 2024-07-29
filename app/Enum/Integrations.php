<?php

declare(strict_types=1);

namespace App\Enum;

class Integrations
{
    public const PROVIDER_GOOGLE_CALENDAR = 'google_calendar';

    public const PROVIDER_GOOGLE_MEET = 'google_meet';

    public const PROVIDER_ZOOM = 'zoom';

    public const PROVIDERS = [
        self::PROVIDER_GOOGLE_CALENDAR,
        self::PROVIDER_ZOOM,
        self::PROVIDER_GOOGLE_MEET,
    ];

    public const PROVIDER_CATEGORIES = [

    ];

    public const GOOGLE_CALENDAR_PERMISSIONS = [
        \Google_Service_Oauth2::OPENID,
        \Google_Service_Oauth2::USERINFO_EMAIL,
        \Google_Service_Oauth2::USERINFO_PROFILE,
        \Google_Service_Calendar::CALENDAR,
        \Google_Service_Calendar::CALENDAR_EVENTS,
    ];
}
