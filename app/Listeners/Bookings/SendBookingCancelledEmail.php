<?php

declare(strict_types=1);

namespace App\Listeners\Bookings;

use App\Entities\Guest;
use App\Events\Bookings\BookingCancelled;
use App\Notifications\Bookings\BookingCancelledNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class SendBookingCancelledEmail implements ShouldQueue
{
    public function __construct(public BookingCancelled $event)
    {
    }

    public function handle()
    {
        if (!$this->event->booking->user->hasVerifiedEmail()) {
            Log::info('Notification not send because host email is not verified');

            return;
        }

        try {
            Notification::route('mail', $this->event->booking->invitee_email)->notify(
                new BookingCancelledNotification($this->event->booking)
            );
        } catch (\Exception $e) {
            Log::error('BookingCancelledNotification not send because of error: ' . $e->getMessage());
        }

        foreach ($this->event->booking->guests as $guestEmailAddress) {
            try {
                $guest = new Guest($guestEmailAddress);
                $guest->notify(new BookingCancelledNotification($this->event->booking));
            } catch (\Exception $e) {
                Log::error('BookingCancelledNotification not send because of error: '.$e->getMessage());
            }
        }
    }
}
