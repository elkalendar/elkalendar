<?php

declare(strict_types=1);

namespace App\Services;

use App\Enum\EventLocationTypes;
use App\Http\Requests\Booking\BookRequest;
use App\Models\EventLocation;

class EventLocationService
{
    public function getEventLocationValueFromRequest(
        EventLocation $eventLocation,
        BookRequest $request,
    ) {
        if ($request->get('location') === EventLocationTypes::IN_PERSON_GUEST->value) {
            return $request->get('locationData')['address'];
        }

        if ($request->get('location') === EventLocationTypes::IN_PERSON_HOST->value) {
            return $eventLocation->settings()->get('address');
        }

        if ($request->get('location') === EventLocationTypes::TEXT->value) {
            return $eventLocation->settings()->get('text');
        }

        if ($request->get('location') === EventLocationTypes::LINK->value) {
            return $eventLocation->settings()->get('link');
        }
    }
}
