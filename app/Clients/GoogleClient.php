<?php

declare(strict_types=1);

namespace App\Clients;

use App\Entities\GoogleAccessToken;
use App\Enum\Integrations;
use App\Events\Integrations\GoogleAccessTokenRefreshed;

class GoogleClient
{
    public static function make(GoogleAccessToken $googleAccessToken): \Google\Client
    {
        $client = new \Google\Client();
        $client->setClientId(config('services.google.client_id'));
        $client->setClientSecret(config('services.google.client_secret'));
        $client->setAccessType('offline');
        $client->setAccessToken($googleAccessToken->toArray());
        $client->setScopes(Integrations::GOOGLE_CALENDAR_PERMISSIONS);

        if ($client->isAccessTokenExpired()) {
            $client->fetchAccessTokenWithRefreshToken($googleAccessToken->getRefreshToken());

            $accessToken = $client->getAccessToken()['access_token'];
            $expiresIn = $client->getAccessToken()['expires_in'];
            $createdAt = $client->getAccessToken()['created'];

            event(new GoogleAccessTokenRefreshed($googleAccessToken->getIntegrationId(), $accessToken, $expiresIn, $createdAt));
        }

        return $client;
    }
}
