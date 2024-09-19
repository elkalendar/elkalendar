<?php

declare(strict_types=1);

use App\Enum\EventLocationTypes;

return [
    EventLocationTypes::GOOGLE_MEET->value => 'جوجل Meet',
    EventLocationTypes::IN_PERSON_HOST->value => 'مقابلة شخصية: في عنوانك',
    EventLocationTypes::IN_PERSON_GUEST->value => 'مقابلة شخصية: في عنوان العميل',
    EventLocationTypes::ASK_INVITEE->value => 'سؤال المدعو',
    EventLocationTypes::LINK->value => 'رابط مخصص',
    EventLocationTypes::TEXT->value => 'نص',
    EventLocationTypes::ZOOM->value => 'زووم',
    EventLocationTypes::MICROSOFT_TEAMS->value => 'مايكروسوفت Teams',
    EventLocationTypes::PHONE_OUTGOING->value => 'مكالمة هاتفية صادرة',
    EventLocationTypes::PHONE_INCOMING->value => 'مكالمة هاتفية واردة',
];
