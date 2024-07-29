<?php

declare(strict_types=1);

namespace App\Services;

use App\Enum\EventLocationTypes;
use App\Models\Booking;
use Carbon\Carbon;
use Spatie\IcalendarGenerator\Components\Calendar;
use Spatie\IcalendarGenerator\Components\Event;
use Spatie\IcalendarGenerator\Properties\TextProperty;

class ICalendarService
{
    public function generate(Booking $booking, bool $isHost = true): string
    {
        $startTime = $this->getStartTime($booking, $isHost);
        $endTime = $this->getEndTime($booking, $isHost);

        $iCalendarEvent = Event::create($booking->event->name)
            ->description($booking->event->description)
            ->startsAt($startTime)
            ->endsAt($endTime)
            ->withoutTimezone()
            ->address($booking->getMeetingLocation())
            ->attendee($booking->invitee_email, $booking->invitee_name)
            ->organizer($booking->event->user->email, $booking->event->user->name);

        if (
            $booking->location === EventLocationTypes::GOOGLE_MEET->value ||
            $booking->location === EventLocationTypes::ZOOM->value ||
            $booking->location === EventLocationTypes::LINK->value
        ) {
            $iCalendarEvent->url($booking->getMeetingLocation());
        }

        $calendar = Calendar::create()
            ->productIdentifier('elkalendar.com')
            ->event($iCalendarEvent);

        $calendar->appendProperty(TextProperty::create('METHOD', 'REQUEST'));

        return $calendar->get();
    }

    private function getStartTime(Booking $booking, bool $isHost = true): Carbon
    {
        if ($isHost) {
            return $booking->getBookingTimeForHostTimezone();
        }

        return $booking->getBookingTimeForGuestTimezone();
    }

    private function getEndTime(Booking $booking, bool $isHost = true): Carbon
    {
        if ($isHost) {
            return $booking->getBookingEndTimeForHostTimezone();
        }

        return $booking->getBookingEndTimeForGuestTimezone();
    }
}
