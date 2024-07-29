<?php

declare(strict_types=1);

namespace App\Listeners\Bookings;

use App\Events\Bookings\BookingCreated;
use App\Notifications\Bookings\BookingCreatedHostNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class SendBookingCreatedEmailToHost implements ShouldQueue
{
    public function __construct(public BookingCreated $event)
    {
    }

    public function handle($event)
    {
        if (!$event->booking->user->hasVerifiedEmail()) {
            Log::info('Notification not send because host email is not verified');

            return;
        }

        try {
            Notification::send($event->booking->user, new BookingCreatedHostNotification($event->booking));
        } catch (\Exception $e) {
            Log::error('BookingCreatedHostNotification not send because of error: ' . $e->getMessage());
        }
    }
}
