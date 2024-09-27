<?php

declare(strict_types=1);

namespace App\Enum;

use App\Traits\HasEnumMethods;

enum EventLocationTypes: string
{
    use HasEnumMethods;

    case TEXT = 'text';

    case ASK_INVITEE = 'ask_invitee';

    case LINK = 'link';

    case IN_PERSON_HOST = 'in_person_host';

    case IN_PERSON_GUEST = 'in_person_guest';

    case PHONE_OUTGOING = 'phone_outgoing';

    case PHONE_INCOMING = 'phone_incoming';

    case GOOGLE_MEET = 'google_meet';

    case ZOOM = 'zoom';

    case MICROSOFT_TEAMS = 'microsoft_teams';

    public static function getEnabledLocationTypes(): array
    {
        $enabledList = [];

        foreach (self::cases() as $case) {
            if (config('event.enable_' . $case->value . '_location')) {
                $enabledList[] = [
                    'key' => $case->value,
                    'title' => __('location_types_user.title.' . $case->value),
                    'description' => __('location_types_user.description.' . $case->value),
                ];
            }
        }

        return $enabledList;
    }

    public static function getLabeledLocationTypes(): array
    {
        return array_map(fn($value) => [
            'key' => $value,
            'label' => __('enums.event_location_types.' . $value),
        ], self::keys());
    }
}
