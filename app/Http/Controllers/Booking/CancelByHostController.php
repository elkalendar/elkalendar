<?php

declare(strict_types=1);

namespace App\Http\Controllers\Booking;

use App\Actions\Bookings\CancelBookingByHostAction;
use App\Http\Requests\Booking\CancelByHostRequest;
use App\Models\Booking;

class CancelByHostController
{
    public function __invoke(Booking $booking, CancelByHostRequest $request, CancelBookingByHostAction $action)
    {
        $action->execute(
            $booking,
            auth()->user()->id,
            $request->get('cancel_reason'),
        );

        return redirect()->back();
    }
}
