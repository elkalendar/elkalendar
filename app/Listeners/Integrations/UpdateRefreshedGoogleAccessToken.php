<?php

declare(strict_types=1);

namespace App\Listeners\Integrations;

use App\Events\Integrations\GoogleAccessTokenRefreshed;
use App\Models\Integration;
use Illuminate\Support\Facades\Crypt;

class UpdateRefreshedGoogleAccessToken
{
    public function handle(GoogleAccessTokenRefreshed $event)
    {
        $integration = Integration::where('id', $event->integrationId)->first();
        $integration->token = Crypt::encryptString($event->accessToken);
        $integration->token_expires_in = $event->expiresIn;
        $integration->token_created_at = $event->createdAt;
        $integration->save();
    }
}
