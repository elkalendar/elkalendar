<?php

return [
    'event_location_types' => [
        \App\Enum\EventLocationTypes::GOOGLE_MEET->value => 'جوجل Meet',
        \App\Enum\EventLocationTypes::ZOOM->value => 'زووم',
        \App\Enum\EventLocationTypes::MICROSOFT_TEAMS->value => 'مايكروسوفت Teams',
        \App\Enum\EventLocationTypes::PHONE_OUTGOING->value => 'مكالمة هاتفية صادرة',
        \App\Enum\EventLocationTypes::PHONE_INCOMING->value => 'مكالمة هاتفية واردة',
        \App\Enum\EventLocationTypes::TEXT->value => 'Text',
        \App\Enum\EventLocationTypes::LINK->value => 'رابط مخصص',
        \App\Enum\EventLocationTypes::IN_PERSON_HOST->value => 'مقابلة شخصية: في عنوانك',
        \App\Enum\EventLocationTypes::IN_PERSON_GUEST->value => 'مقابلة شخصية: في عنوان العميل',
        \App\Enum\EventLocationTypes::ASK_INVITEE->value => 'سؤال المدعو',
    ],
];
