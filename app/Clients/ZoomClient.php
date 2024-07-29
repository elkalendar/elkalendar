<?php

declare(strict_types=1);

namespace App\Clients;

use App\Entities\ZoomAccessToken;
use App\Events\Integrations\ZoomAccessTokenRefreshed;
use Carbon\Carbon;
use GuzzleHttp\Client;

class ZoomClient
{
    public static function make(ZoomAccessToken $zoomAccessToken): Client
    {
        $accessToken = $zoomAccessToken->getAccessToken();

        $isTokenExpired = Carbon::parse($zoomAccessToken->getExpiresAt())->isPast();

        if ($isTokenExpired) {
            $client = new Client([
                'base_uri' => 'https://zoom.us/oauth/',
                'headers' => [
                    'Authorization' => 'Basic '.base64_encode(config('services.zoom.client_id').':'.config('services.zoom.client_secret')),
                    'Content-Type' => 'application/x-www-form-urlencoded',
                    'Accept' => 'application/json',
                ],
            ]);

            $response = $client->post('token', [
                'form_params' => [
                    'grant_type' => 'refresh_token',
                    'refresh_token' => $zoomAccessToken->getRefreshToken(),
                    'client_id' => config('services.zoom.client_id'),
                    'client_secret' => config('services.zoom.client_secret'),
                ],
            ]);

            $response = json_decode($response->getBody()->getContents(), true);

            $accessToken = $response['access_token'];
            $refreshToken = $response['refresh_token'];
            $expiresIn = $response['expires_in'];

            $zoomAccessTokenRefreshedEvent = new ZoomAccessTokenRefreshed(
                $zoomAccessToken->getIntegrationId(),
                $accessToken,
                $refreshToken,
                $expiresIn,
            );

            event($zoomAccessTokenRefreshedEvent);
        }

        return new Client([
            'base_uri' => 'https://api.zoom.us/v2/',
            'headers' => [
                'Authorization' => 'Bearer '.$accessToken,
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ],
        ]);
    }
}
