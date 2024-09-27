<?php

declare(strict_types=1);

use App\Enum\EventLocationTypes;

return [
    'title' => [
        EventLocationTypes::TEXT->value => 'Custom Text',
        EventLocationTypes::LINK->value => 'Custom Link',
        EventLocationTypes::ASK_INVITEE->value => 'Ask invitee',
        EventLocationTypes::IN_PERSON_HOST->value => 'In-person Meeting at Host ',
        EventLocationTypes::IN_PERSON_GUEST->value => 'In-person Meeting at Guest',
        EventLocationTypes::PHONE_OUTGOING->value => 'You will call the guest',
        EventLocationTypes::PHONE_INCOMING->value => 'Guest will call you',
        EventLocationTypes::GOOGLE_MEET->value => 'Google Meet',
        EventLocationTypes::ZOOM->value => 'Zoom Meeting',
        EventLocationTypes::MICROSOFT_TEAMS->value => 'Microsoft Teams',
    ],
    'description' => [
        EventLocationTypes::TEXT->value => 'Custom Text',
        EventLocationTypes::LINK->value => 'Custom Link',
        EventLocationTypes::ASK_INVITEE->value => 'Ask invitee',
        EventLocationTypes::IN_PERSON_HOST->value => 'In-person Meeting at Host ',
        EventLocationTypes::IN_PERSON_GUEST->value => 'In-person Meeting at Guest',
        EventLocationTypes::PHONE_OUTGOING->value => 'You will call the guest',
        EventLocationTypes::PHONE_INCOMING->value => 'Guest will call you',
        EventLocationTypes::GOOGLE_MEET->value => 'Google Meet',
        EventLocationTypes::ZOOM->value => 'Zoom Meeting',
        EventLocationTypes::MICROSOFT_TEAMS->value => 'Microsoft Teams',
    ],
];
