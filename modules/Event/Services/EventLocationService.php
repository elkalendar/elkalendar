<?php

declare(strict_types=1);

namespace Modules\Event\Services;

use App\Enum\EventLocationTypes;
use App\Models\EventLocation;
use Modules\Booking\Http\Requests\BookRequest;

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
