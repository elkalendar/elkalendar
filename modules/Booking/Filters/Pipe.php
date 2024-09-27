<?php

declare(strict_types=1);

namespace Modules\Booking\Filters;

use Closure;
use Illuminate\Database\Eloquent\Builder;

interface Pipe
{
    public function apply(Builder $bookings, Closure $next);
}
