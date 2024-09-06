<?php

declare(strict_types=1);

namespace Modules\Booking\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Modules\Booking\Events\BookingCreated;
use Modules\Booking\Notifications\BookingCreatedGuestNotification;
use Modules\Booking\Notifications\BookingCreatedInviteeNotification;
use Modules\Booking\Support\Guest;

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
