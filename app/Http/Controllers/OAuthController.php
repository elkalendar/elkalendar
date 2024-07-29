<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Auth\CreateOrUpdateUserAction;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Socialite;

class OAuthController
{
    public function login()
    {
        return Socialite::driver('yottahq')
            ->with([
                'source' => 'elkalendar',
            ])
            ->redirect();
    }

    /**
     * @throws \Throwable
     */
    public function callback(CreateOrUpdateUserAction $createUserAction)
    {
        try {
            /**
             * @var \Laravel\Socialite\Two\User $socialiteUser
             */
            $socialiteUser = Socialite::driver('yottahq')->user();
        } catch (\Exception $e) {
            Log::error('Error authenticating user with YottaHQ', [
                'message' => $e->getMessage(),
                'code' => $e->getCode(),
            ]);

            return redirect()->route('login');
        }

        $user = $createUserAction->execute(
            $socialiteUser->id,
            $socialiteUser->name,
            Str::slug($socialiteUser->name) . $socialiteUser->id,
            $socialiteUser->email,
            $socialiteUser->avatar,
            $socialiteUser->user['data']['verifiedAt'],
        );

        auth()->login($user);

        return redirect()->route('dashboard');
    }
}
