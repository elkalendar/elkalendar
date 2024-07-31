<?php
declare(strict_types=1);

namespace App\Traits;

use App\Models\Booking;

trait Bookable
{
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
