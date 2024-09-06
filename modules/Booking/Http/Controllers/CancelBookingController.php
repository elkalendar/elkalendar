<?php

declare(strict_types=1);

namespace Modules\Booking\Http\Controllers;

use App\Models\Booking;
use Modules\Booking\Actions\CancelBookingByGuestAction;
use Modules\Booking\Http\Requests\CancelByGuestRequest;

class CancelBookingController
{
    public function __invoke(Booking $booking, CancelByGuestRequest $request, CancelBookingByGuestAction $action)
    {
        $action->execute($booking, $request->get('cancel_reason'));

        return redirect()->back();
    }
}
