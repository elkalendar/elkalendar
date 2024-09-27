<?php

declare(strict_types=1);

namespace Modules\Booking\Filters;

use Closure;
use Illuminate\Database\Eloquent\Builder;

class BookingScopeFilter implements Pipe
{
    public function apply(Builder $bookings, Closure $next)
    {
        switch (request('filter')) {
            case 'past':
                $bookings->where('start_time', '<=', now())
                    ->whereNull('cancelled_at')
                    ->orderBy('start_time', 'desc');
                break;
            case 'cancelled':
                $bookings->whereNotNull('cancelled_at');
                break;
            default:
                $bookings->where('start_time', '>', now())
                    ->whereNull('cancelled_at');
                break;
        }

        return $next($bookings);
    }
}
