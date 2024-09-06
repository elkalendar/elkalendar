<?php

declare(strict_types=1);

namespace Modules\Booking\Actions;

use App\Models\Booking;
use Modules\Booking\Events\BookingCancelled;

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
