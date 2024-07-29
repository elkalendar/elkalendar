<?php

declare(strict_types=1);

namespace App\Actions\Bookings;

use App\Events\Bookings\BookingCancelled;
use App\Models\Booking;

class CancelBookingByHostAction
{
    public function execute(Booking $booking, int $userId, string $cancelReason): void
    {
        $booking->cancelled_at = now();
        $booking->cancel_reason = $cancelReason;
        $booking->cancelled_by = $userId;
        $booking->save();

        event(new BookingCancelled($booking));
    }
}
