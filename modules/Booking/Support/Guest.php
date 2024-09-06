<?php

declare(strict_types=1);

namespace Modules\Booking\Support;

use Illuminate\Notifications\Notifiable;

class Guest
{
    use Notifiable;

    public function __construct(public string $email)
    {
    }
}
