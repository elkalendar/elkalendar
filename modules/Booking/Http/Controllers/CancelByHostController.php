<?php

declare(strict_types=1);

namespace Modules\Booking\Http\Controllers;

use App\Models\Booking;
use Modules\Booking\Actions\CancelBookingByHostAction;
use Modules\Booking\Http\Requests\CancelByHostRequest;

class CancelByHostController
{
    public function __invoke(Booking $booking, CancelByHostRequest $request, CancelBookingByHostAction $action)
    {
        $action->execute(
            $booking,
            auth()->user()->id,
            $request->get('cancel_reason'),
        );
    }
}
