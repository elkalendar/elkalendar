<?php

declare(strict_types=1);

namespace App\Http\Controllers;

class UserController
{
    public function resend()
    {
        auth()->user()->sendEmailVerificationNotification();
    }

    public function logout()
    {
        $user = request()->user();
        $user->logoutFromOAuth();

        auth()->logout();
        session()->flush();

        return redirect()->away(config('app.domain_with_scheme'));
    }
}
