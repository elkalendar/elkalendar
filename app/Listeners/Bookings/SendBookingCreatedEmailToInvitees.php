<?php

declare(strict_types=1);

namespace App\Listeners\Bookings;

use App\Entities\Guest;
use App\Events\Bookings\BookingCreated;
use App\Notifications\Bookings\BookingCreatedGuestNotification;
use App\Notifications\Bookings\BookingCreatedInviteeNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class SendBookingCreatedEmailToInvitees implements ShouldQueue
{
    public function __construct(public BookingCreated $event)
    {
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        if (! $event->booking->user->hasVerifiedEmail()) {
            Log::info('Notification not send because host email is not verified');

            return;
        }

        try {
            Notification::route('mail', $event->booking->invitee_email)->notify(new BookingCreatedInviteeNotification($event->booking));
        } catch (\Exception $e) {
            Log::error('BookingCreatedInviteeNotification not send because of error: '.$e->getMessage());
        }

        foreach ($event->booking->guests as $guestEmailAddress) {
            try {
                $guest = new Guest($guestEmailAddress);
                $guest->notify(new BookingCreatedGuestNotification($event->booking));
            } catch (\Exception $e) {
                Log::error('BookingCreatedGuestNotification not send because of error: '.$e->getMessage());
            }
        }
    }
}
