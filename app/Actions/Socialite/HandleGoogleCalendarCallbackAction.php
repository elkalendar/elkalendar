<?php

declare(strict_types=1);

namespace App\Actions\Socialite;

use App\Enum\AppCategories;
use App\Enum\Integrations;
use App\Exceptions\SocialiteCallbackException;
use App\Models\Integration;
use App\Services\Integrations\GoogleCalendarService;
use Google\Service\Calendar\CalendarListEntry;
use Illuminate\Support\Facades\Crypt;
use Laravel\Socialite\Facades\Socialite;

class HandleGoogleCalendarCallbackAction
{
    public function execute(): void
    {
        config()->set('services.google.redirect', 'https://app.elkalendar.com/apps/connect/google_calendar/callback');

        try {
            $socialUser = Socialite::driver('google')
                ->scopes(Integrations::GOOGLE_CALENDAR_PERMISSIONS)
                ->with(['access_type' => 'offline', 'prompt' => 'consent select_account'])
                ->user();
        } catch (\Exception $e) {
            throw new SocialiteCallbackException($e->getMessage());
        }

        $integration = Integration::updateOrCreate([
            'user_id' => auth()->user()->id,
            'provider' => Integrations::PROVIDER_GOOGLE_CALENDAR,
            'provider_id' => $socialUser->getId(),
        ], [
            'category' => AppCategories::CALENDAR,
            'email' => $socialUser->getEmail(),
            'name' => $socialUser->getName(),
            'nickname' => $socialUser->getNickname(),
            'token' => Crypt::encryptString($socialUser->token),
            'refresh_token' => Crypt::encryptString($socialUser->refreshToken),
            'token_created_at' => now(),
            'token_expires_at' => now()->addSeconds($socialUser->expiresIn),
            'token_expires_in' => $socialUser->expiresIn,
            'avatar' => $socialUser->getAvatar(),
        ]);

        /**
         * @var GoogleCalendarService $googleCalendarService
         */
        $googleCalendarService = app(GoogleCalendarService::class);
        $googleCalendarService->setAccessToken($integration->getAccessToken());

        $calendarList = $googleCalendarService->getCalendarList();

        $primaryCalendar = 'primary';

        if ($calendarList->count() > 0) {
            /**
             * @var CalendarListEntry $primaryCalendarItem
             */
            $primaryCalendarItem = collect($calendarList->getItems())->first(fn ($calendar) => $calendar->getPrimary());
            $primaryCalendar = $primaryCalendarItem->getId();
        }

        $integration->settings()->set('primaryCalendarId', $primaryCalendar);
        $integration->settings()->set('calendarList', $calendarList);
        $integration->settings()->set('approvedScopes', $socialUser->approvedScopes);

        $googleMeet = Integration::updateOrCreate([
            'user_id' => auth()->user()->id,
            'provider' => Integrations::PROVIDER_GOOGLE_MEET,
            'provider_id' => $socialUser->getId(),
        ], [
            'category' => AppCategories::CONFERENCE,
            'email' => $socialUser->getEmail(),
            'name' => $socialUser->getName(),
            'nickname' => $socialUser->getNickname(),
            'token' => Crypt::encryptString($socialUser->token),
            'refresh_token' => Crypt::encryptString($socialUser->refreshToken),
            'token_created_at' => now(),
            'token_expires_at' => now()->addSeconds($socialUser->expiresIn),
            'token_expires_in' => $socialUser->expiresIn,
            'avatar' => $socialUser->getAvatar(),
        ]);

        event(new \App\Events\Integrations\IntegrationCreated($integration));
        event(new \App\Events\Integrations\IntegrationCreated($googleMeet));
    }
}
