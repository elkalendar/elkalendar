<?php

declare(strict_types=1);

namespace Modules\Booking\Actions;

use App\Models\Booking;
use Modules\Booking\Events\BookingCancelled;

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
