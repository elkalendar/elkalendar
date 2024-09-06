<?php

declare(strict_types=1);

namespace Modules\Booking\Http\Controllers;

use App\Models\Booking;
use Inertia\Inertia;
use Modules\Booking\Http\Resources\BookingResource;
use Modules\Common\Http\Resources\HostResource;
use Modules\Event\Http\Resources\EventResource;
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
