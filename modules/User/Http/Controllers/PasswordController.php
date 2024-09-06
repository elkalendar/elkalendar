<?php

declare(strict_types=1);

namespace Modules\User\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Modules\User\Events\UserPasswordUpdated;
use Modules\User\Http\Requests\ChangePasswordRequest;

class PasswordController
{
    public function show(): \Inertia\Response
    {
        return Inertia::render('Settings/Password');
    }

    public function update(ChangePasswordRequest $request): void
    {
        $request->user()->update([
            'password' => Hash::make($request->get('password')),
        ]);

        event(new UserPasswordUpdated($request->user()));
    }
}
