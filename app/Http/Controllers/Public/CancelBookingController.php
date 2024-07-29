<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Events\Bookings\BookingCancelled;
use App\Models\Booking;

class CancelBookingController
{
    public function __invoke(Booking $booking)
    {
        request()->validate([
            'cancel_reason' => ['required', 'string', 'max:255'],
        ]);

        $booking->cancelled_at = now();
        $booking->cancel_reason = request('cancel_reason');
        $booking->save();

        event(new BookingCancelled($booking));

        return redirect()->back();
    }
}
