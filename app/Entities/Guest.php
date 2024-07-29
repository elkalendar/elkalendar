<?php

declare(strict_types=1);

namespace App\Entities;

use Illuminate\Notifications\Notifiable;

class Guest
{
    use Notifiable;

    public function __construct(public string $email)
    {
    }
}
