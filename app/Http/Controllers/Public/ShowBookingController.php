<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Resources\BookingResource;
use App\Http\Resources\EventResource;
use App\Http\Resources\HostResource;
use App\Models\Booking;
use Inertia\Inertia;
use Spatie\CalendarLinks\Link;

class ShowBookingController
{
    public function __invoke(Booking $booking)
    {
        $event = $booking->event->load([
            'locations' => function ($query) {
                $query->orderBy('position');
            },
            'user',
        ]);

        if ($booking->cancelled_at) {
            return Inertia::render('Bookings/Public/BookingCancelled', [
                'userBookingPage' => url($event->user->username),
            ]);
        }

        if ($booking->start_time->isPast()) {
            return Inertia::render('Bookings/Public/BookingInPast', [
                'userBookingPage' => url($event->user->username),
            ]);
        }

        $startTime = $booking->start_time;
        $endTime = $booking->end_time;

        $googleLink = Link::create($event->name, $startTime, $endTime)
            ->description($event->description)
            ->address($event->location ?? '')
            ->google();

        $outlookLink = Link::create($event->name, $startTime, $endTime)
            ->description($event->description)
            ->address($event->location ?? '')
            ->webOutlook();

        $officeLink = Link::create($event->name, $startTime, $endTime)
            ->description($event->description)
            ->address($event->location ?? '')
            ->webOffice();

        return Inertia::render('Bookings/Public/BookingConfirmation', [
            'host' => HostResource::make($event->user),
            'event' => EventResource::make($event),
            'booking' => BookingResource::make($booking),
            'addToCalendarLinks' => [
                'google' => $googleLink,
                'outlook' => $outlookLink,
                'office' => $officeLink,
            ],
        ]);
    }
}
