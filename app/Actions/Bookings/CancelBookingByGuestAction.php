<?php

declare(strict_types=1);

namespace App\Actions\Bookings;

use App\Events\Bookings\BookingCancelled;
use App\Models\Booking;

class CancelBookingByGuestAction
{
    public function execute(Booking $booking, string $cancelReason): void
    {
        $booking->cancelled_at = now();
        $booking->cancel_reason = $cancelReason;
        $booking->save();

        event(new BookingCancelled($booking));
    }
}
