<?php

declare(strict_types=1);

namespace Modules\User\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EmailController
{
    public function show()
    {
        return Inertia::render('Email');
    }

    public function update(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email', 'max:150', 'unique:users,email,' . $request->user()->id],
        ]);

        if ($request->user()->email !== $request->email) {
            session()->flash('message', 'تم تغيير البريد الإلكتروني بنجاح، يرجى التحقق من بريدك الإلكتروني لتأكيد البريد الإلكتروني الجديد.');
        }

        $request->user()->forceFill([
            'email' => $request->email,
            'email_verified_at' => null,
        ])->save();

        $request->user()->sendEmailVerificationNotification();

        return redirect()->route('email.show');
    }
}
