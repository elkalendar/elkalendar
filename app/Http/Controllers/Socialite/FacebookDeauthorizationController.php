<?php

declare(strict_types=1);

namespace App\Http\Controllers\Socialite;

use Illuminate\Support\Facades\Log;

class FacebookDeauthorizationController
{
    public function deauthorizeFacebook()
    {
        $signed_request = request('signed_request');

        try {
            $data = $this->parseSignedRequest($signed_request);
        } catch (\Exception $e) {
            Log::error($e->getMessage(), [
                'signed_request' => $signed_request,
            ]);

            return;
        }

        $userId = $data['user_id'];

        event(new \App\Events\FacebookUserDeauthorized($userId));
    }

    /**
     * @throws \Exception
     */
    private function parseSignedRequest($signed_request)
    {
        [$encoded_sig, $payload] = explode('.', $signed_request, 2);

        $secret = config('services.facebook.client_secret');

        $sig = $this->base64UrlDecode($encoded_sig);
        $data = json_decode($this->base64UrlDecode($payload), true);

        $expected_sig = hash_hmac('sha256', $payload, $secret, true);
        if ($sig !== $expected_sig) {
            throw new \Exception('Bad Signed JSON signature!');
        }

        return $data;
    }

    private function base64UrlDecode($input): false|string
    {
        return base64_decode(strtr($input, '-_', '+/'));
    }
}
