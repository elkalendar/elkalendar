<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enum\EventLocationTypes;
use App\Http\Requests\EventLocation\EventLocationsCustomTextRequest;
use App\Http\Requests\EventLocation\EventLocationsInPersonHostRequest;
use App\Http\Requests\EventLocation\EventLocationsLinkRequest;

class EventLocationsController
{
    public function setCustomText(string $eventId, EventLocationsCustomTextRequest $request)
    {
        $event = auth()->user()->events()->findByHashidOrFail($eventId);

        if ($request->get('locationId')) {
            $eventLocation = $event->locations()->findByHashidOrFail($request->get('locationId'));
            $eventLocation->settings()->set('text', $request->get('text'));

            return;
        }

        $event->locations()->where('type', EventLocationTypes::TEXT)->delete();

        $eventLocation = $event->locations()->create([
            'type' => EventLocationTypes::TEXT,
            'position' => $event->locations()->count() + 1,
        ]);

        $eventLocation->settings()->set('text', $request->get('text'));
    }

    public function setLink(string $eventId, EventLocationsLinkRequest $request)
    {
        $event = auth()->user()->events()->findByHashidOrFail($eventId);

        if ($request->get('locationId')) {
            $eventLocation = $event->locations()->findByHashidOrFail($request->get('locationId'));
            $eventLocation->settings()->set('link', $request->get('link'));
            if ($request->get('linkTitle')) {
                $eventLocation->settings()->set('linkTitle', $request->get('linkTitle'));
            }

            return;
        }

        $event->locations()->where('type', EventLocationTypes::LINK)->delete();

        $eventLocationType = $event->locations()->create([
            'type' => EventLocationTypes::LINK,
            'position' => $event->locations()->count() + 1,
        ]);

        $eventLocationType->settings()->set('link', $request->get('link'));

        if ($request->get('linkTitle')) {
            $eventLocationType->settings()->set('linkTitle', $request->get('linkTitle'));
        }
    }

    public function setInpersonHost(string $eventId, EventLocationsInPersonHostRequest $request)
    {
        $event = auth()->user()->events()->findByHashidOrFail($eventId);

        if ($request->get('locationId')) {
            $eventLocation = $event->locations()->findByHashidOrFail($request->get('locationId'));

            $eventLocation->settings()->set('address', $request->get('address'));

            if ($request->has('showOnBookingPage')) {
                $eventLocation->settings()->set('showOnBookingPage', $request->get('showOnBookingPage'));
            }

            return;
        }

        $event->locations()->where('type', EventLocationTypes::IN_PERSON_HOST)->delete();

        $eventLocationType = $event->locations()->create([
            'type' => EventLocationTypes::IN_PERSON_HOST,
            'position' => $event->locations()->count() + 1,
        ]);

        $eventLocationType->settings()->set('address', $request->get('address'));

        if ($request->get('showOnBookingPage')) {
            $eventLocationType->settings()->set('showOnBookingPage', $request->get('showOnBookingPage'));
        }
    }

    public function setInpersonGuest(string $eventId)
    {
        $event = auth()->user()->events()->findByHashidOrFail($eventId);

        $event->locations()->where('type', EventLocationTypes::IN_PERSON_GUEST)->delete();

        $event->locations()->create([
            'type' => EventLocationTypes::IN_PERSON_GUEST,
            'position' => $event->locations()->count() + 1,
        ]);
    }

    public function setGoogleMeet(string $eventId)
    {
        //TODO: make sure user has a connected google calendar integration

        $user = auth()->user();
        $googleCalendarIntegration = $user->integrations()->where('provider', 'google_calendar')->first();

        if (! $googleCalendarIntegration) {
            return redirect()->back()->withErrors([
                'google_calendar' => 'يرجى ربط تطبيق تقويم Google من التطبيقات اولا قبل اضافة هذه الطريقة الى الحدث.',
            ]);
        }

        $event = auth()->user()->events()->findByHashidOrFail($eventId);

        $event->locations()->where('type', EventLocationTypes::GOOGLE_MEET)->delete();

        $event->locations()->create([
            'type' => EventLocationTypes::GOOGLE_MEET,
            'position' => $event->locations()->count() + 1,
        ]);
    }

    public function setZoom(string $eventId)
    {

        $user = auth()->user();
        $zoomIntegration = $user->integrations()->where('provider', EventLocationTypes::ZOOM)->first();

        if (! $zoomIntegration) {
            return redirect()->back()->withErrors([
                'zoom' => 'يرجى ربط تطبيق زووم Zoom من التطبيقات اولا قبل اضافة هذه الطريقة الى الحدث.',
            ]);
        }

        $event = auth()->user()->events()->findByHashidOrFail($eventId);

        $event->locations()->where('type', EventLocationTypes::ZOOM)->delete();

        $event->locations()->create([
            'type' => EventLocationTypes::ZOOM,
            'position' => $event->locations()->count() + 1,
        ]);
    }

    public function deleteLocation(string $eventId, string $locationId)
    {
        $event = auth()->user()->events()->findByHashidOrFail($eventId);
        $eventLocation = $event->locations()->findByHashidOrFail($locationId);

        // TODO: make sure that the location is not the only location for the event
        if ($event->locations()->count() === 1) {
            return redirect()->back()->withErrors([
                'location' => 'لا يمكن حذف الموقع الوحيد للحدث.',
            ]);
        }

        $eventLocation->delete();
    }
}
