<?php

declare(strict_types=1);

namespace App\Listeners\Integrations;

use App\Events\Integrations\ZoomAccessTokenRefreshed;
use App\Models\Integration;
use Illuminate\Support\Facades\Crypt;

class UpdateRefreshedZoomAccessToken
{
    public function handle(ZoomAccessTokenRefreshed $event)
    {
        $integration = Integration::where('id', $event->integrationId)->first();
        $integration->token = Crypt::encryptString($event->accessToken);
        $integration->refresh_token = Crypt::encryptString($event->refreshToken);
        $integration->token_expires_in = $event->expiresIn;
        $integration->token_expires_at = now()->addHour();
        $integration->token_created_at = now();
        $integration->save();
    }
}
