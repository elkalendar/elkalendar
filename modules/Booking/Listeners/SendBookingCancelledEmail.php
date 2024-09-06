<?php

declare(strict_types=1);

namespace Modules\Booking\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Modules\Booking\Events\BookingCancelled;
use Modules\Booking\Notifications\BookingCancelledNotification;
use Modules\Booking\Support\Guest;

class SendBookingCancelledEmail implements ShouldQueue
{
    public function __construct(public BookingCancelled $event)
    {
    }

    public function handle()
    {
        if (! $this->event->booking->user->hasVerifiedEmail()) {
            Log::info('Notification not send because host email is not verified');

            return;
        }

        try {
            Notification::route('mail', $this->event->booking->invitee_email)->notify(
                new BookingCancelledNotification($this->event->booking)
            );
        } catch (\Exception $e) {
            Log::error('BookingCancelledNotification not send because of error: '.$e->getMessage());
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
