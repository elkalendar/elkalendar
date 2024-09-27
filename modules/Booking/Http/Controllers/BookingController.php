<?php

declare(strict_types=1);

namespace Modules\Booking\Http\Controllers;

use Inertia\Inertia;
use Modules\Booking\Actions\GetBookingsAction;

class BookingController
{
    public function __construct(
    ) {
    }

    public function index(GetBookingsAction $action): \Inertia\Response
    {
        $bookings = $action->execute();

        return Inertia::render('Bookings/Index', [
            'bookings' => \Modules\Booking\Http\Resources\BookingResource::collection($bookings),
        ]);
    }
}
