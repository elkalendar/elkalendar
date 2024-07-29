<?php

declare(strict_types=1);

namespace App\Actions\Socialite;

use App\Enum\AppCategories;
use App\Enum\Integrations;
use App\Exceptions\SocialiteCallbackException;
use App\Models\Integration;
use Illuminate\Support\Facades\Crypt;
use Laravel\Socialite\Facades\Socialite;

class HandleZoomCallbackAction
{
    public function execute()
    {
        try {
            $socialUser = Socialite::driver('zoom')->user();
        } catch (\Exception $e) {
            throw new SocialiteCallbackException($e->getMessage());
        }

        $integration = Integration::updateOrCreate([
            'user_id' => auth()->user()->id,
            'provider' => Integrations::PROVIDER_ZOOM,
            'provider_id' => $socialUser->getId(),
        ], [
            'email' => $socialUser->getEmail(),
            'name' => $socialUser->getName(),
            'nickname' => $socialUser->getNickname(),
            'token' => Crypt::encryptString($socialUser->token),
            'refresh_token' => Crypt::encryptString($socialUser->refreshToken),
            'token_created_at' => now(),
            'token_expires_at' => now()->addSeconds($socialUser->expiresIn),
            'token_expires_in' => $socialUser->expiresIn,
            'avatar' => $socialUser->getAvatar(),
            'category' => AppCategories::CONFERENCE,
        ]);

        event(new \App\Events\Integrations\IntegrationCreated($integration));
    }
}
