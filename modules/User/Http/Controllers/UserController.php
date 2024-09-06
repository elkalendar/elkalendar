<?php

declare(strict_types=1);

namespace Modules\User\Http\Controllers;

class UserController
{
    public function resend(): void
    {
        auth()->user()->sendEmailVerificationNotification();
    }
}
