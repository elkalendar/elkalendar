<?php

declare(strict_types=1);

namespace Modules\Booking\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;
use Modules\Booking\Events\BookingCancelled;
use Modules\Booking\Notifications\BookingCancelledNotification;

class SendBookingCancelledEmailToHost
{
    public function __construct(public BookingCancelled $event)
    {
    }

    public function __invoke()
    {
        if (!$this->event->booking->user->hasVerifiedEmail()) {
            Log::info('Notification not send because host email is not verified');

            return;
        }

        try {
            $this->event->booking->user->notify(new BookingCancelledNotification($this->event->booking));
        } catch (\Exception $e) {
            Log::error('BookingCancelledNotification not send because of error: ' . $e->getMessage());
        }
    }
}
