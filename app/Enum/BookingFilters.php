<?php

declare(strict_types=1);

namespace App\Enum;

enum BookingFilters: string
{
    case incoming = 'incoming';
    case past = 'past';
    case cancelled = 'cancelled';
}
