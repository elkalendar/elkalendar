<?php

declare(strict_types=1);

return [
    'enable_' . \App\Enum\EventLocationTypes::TEXT->value . '_location' => true,
    'enable_' . \App\Enum\EventLocationTypes::LINK->value . '_location' => true,
    'enable_' . \App\Enum\EventLocationTypes::ASK_INVITEE->value . '_location' => false,
    'enable_' . \App\Enum\EventLocationTypes::IN_PERSON_GUEST->value . '_location' => true,
    'enable_' . \App\Enum\EventLocationTypes::IN_PERSON_HOST->value . '_location' => true,
    'enable_' . \App\Enum\EventLocationTypes::PHONE_INCOMING->value . '_location' => true,
    'enable_' . \App\Enum\EventLocationTypes::PHONE_OUTGOING->value . '_location' => true,
    'enable_' . \App\Enum\EventLocationTypes::GOOGLE_MEET->value . '_location' => false,
    'enable_' . \App\Enum\EventLocationTypes::ZOOM->value . '_location' => false,
    'enable_' . \App\Enum\EventLocationTypes::MICROSOFT_TEAMS->value . '_location' => false,
];
