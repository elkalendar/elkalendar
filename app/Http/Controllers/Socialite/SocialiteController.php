<?php

declare(strict_types=1);

namespace App\Http\Controllers\Socialite;

use App\Actions\Socialite\HandleGoogleCalendarCallbackAction;
use App\Actions\Socialite\HandleZoomCallbackAction;
use App\Enum\Integrations;
use App\Exceptions\SocialiteCallbackException;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController
{
    public function connect(string $key)
    {
        switch ($key) {
            case 'google_calendar':
            case 'google_meet':
                config()->set('services.google.redirect', 'https://app.elkalendar.com/apps/connect/google_calendar/callback');

                return Socialite::driver('google')
                    ->scopes(Integrations::GOOGLE_CALENDAR_PERMISSIONS)
                    ->with(['access_type' => 'offline', 'prompt' => 'consent select_account'])
                    ->redirect();
            case 'zoom':
                return Socialite::driver('zoom')
                    ->redirect();
            default:
                Log::error('App not found', [
                    'appKey' => $key,
                ]);
                break;
        }
    }

    public function callback(
        string $key,
        HandleGoogleCalendarCallbackAction $googleCalendarCallbackAction,
        HandleZoomCallbackAction $zoomCallbackAction,
    ) {
        try {
            if ($key === 'google_calendar' || $key === 'google_meet') {
                $googleCalendarCallbackAction->execute();

                return redirect()->route('connected');
            }

            if ($key === 'zoom') {
                $zoomCallbackAction->execute();

                return redirect()->route('connected');
            }

            abort(404);
        } catch (SocialiteCallbackException $e) {
            Log::error('Error in Socialite call back', [
                'provider' => $key,
                'message' => $e->getMessage(),
            ]);

            return redirect()->route('apps.index')->withErrors([
                'message' => $e->getMessage(),
            ]);
        }
    }
}
