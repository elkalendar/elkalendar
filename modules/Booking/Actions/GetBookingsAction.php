<?php

declare(strict_types=1);

namespace Modules\Booking\Actions;

use App\Models\Booking;
use Illuminate\Pipeline\Pipeline;
use Modules\Booking\Filters\BookingScopeFilter;

class GetBookingsAction
{
    public function execute()
    {
        $query = Booking::query();

        return app(Pipeline::class)
            ->send($query)
            ->through([
                BookingScopeFilter::class,
            ])
            ->via('apply')
            ->then(function ($bookings) {
                return $bookings->orderBy('start_time')
                    ->where('user_id', auth()->user()->getAuthIdentifier())
                    ->whereHas('event', function ($query) {
                        $query->where('deleted_at', null);
                    })
                    ->with(['event'])
                    ->paginate(Booking::PER_PAGE);
            });
    }
}
