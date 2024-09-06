<?php

declare(strict_types=1);

namespace App\Enum;

use App\Traits\HasEnumMethods;

enum EventLocationTypes: string
{
    use HasEnumMethods;

    case GOOGLE_MEET = 'google_meet';

    case ZOOM = 'zoom';

    case MICROSOFT_TEAMS = 'microsoft_teams';

    case PHONE_OUTGOING = 'phone_outgoing';

    case PHONE_INCOMING = 'phone_incoming';

    case TEXT = 'text';

    case LINK = 'link';

    case IN_PERSON_HOST = 'in_person_host';

    case IN_PERSON_GUEST = 'in_person_guest';

    case ASK_INVITEE = 'ask_invitee';

    public static function getEnabledLocationTypes(): array
    {
        return self::forSelect();
    }

    public static function getLabeledLocationTypes(): array
    {
        return array_map(fn ($value) => [
            'key' => $value,
            'label' => __('enums.event_location_types.'.$value),
        ], self::keys());
    }
}
