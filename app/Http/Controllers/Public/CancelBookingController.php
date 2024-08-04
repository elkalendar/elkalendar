<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Actions\Bookings\CancelBookingByGuestAction;
use App\Http\Requests\Booking\CancelByGuestRequest;
use App\Models\Booking;

class CancelBookingController
{
    public function __invoke(Booking $booking, CancelByGuestRequest $request, CancelBookingByGuestAction $action)
    {
        $action->execute($booking, $request->get('cancel_reason'));

        return redirect()->back();
    }
}
