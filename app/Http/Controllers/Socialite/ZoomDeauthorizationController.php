<?php

declare(strict_types=1);

namespace App\Http\Controllers\Socialite;

use Illuminate\Support\Facades\Log;

class ZoomDeauthorizationController
{
    public function deauthorize()
    {
        $zoomSignatureHeader = request()->header('x-zm-signature');
        $zoomRequestTimestamp = request()->header('x-zm-request-timestamp');
        $requestBodyString = request()->getContent();

        $stringToSign = "v0:$zoomRequestTimestamp:$requestBodyString";
        $hashedString = hash_hmac('sha256', $stringToSign, config('services.zoom.secret_token'));
        $signature = "v0=$hashedString";

        if ($signature !== $zoomSignatureHeader) {
            Log::error('Zoom deauthorization failed. Invalid signature.', [
                'requestPayload' => request()->all(),
                'requestHeaders' => request()->headers->all(),
            ]);

            return;
        }

        $userId = request()->input('payload.user_id');
        $accountId = request()->input('payload.account_id');

        event(new \App\Events\ZoomUserDeauthorized($userId, $accountId));
    }
}
