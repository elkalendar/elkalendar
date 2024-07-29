<?php

declare(strict_types=1);

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Support\Carbon;

class CreateOrUpdateUserAction
{
    public function execute(
        mixed $providerUserId,
        string $name,
        string $username,
        string $email,
        string $avatar,
        string $verifiedAt,
    ) {
        $elkalendarUser = User::where('provider_user_id', $providerUserId)
            ->orWhere('email', $email)->first();

        if ($elkalendarUser) {
            $elkalendarUser->update([
                'name' => $name,
                'email' => $email,
                'avatar' => $avatar,
                'email_verified_at' => $verifiedAt,
            ]);

            return $elkalendarUser;
        }

        return User::create([
            'provider_user_id' => $providerUserId,
            'name' => $name,
            'username' => $username,
            'email' => $email,
            'avatar' => $avatar,
            'email_verified_at' => Carbon::parse($verifiedAt),
        ]);
    }
}
