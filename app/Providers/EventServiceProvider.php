<?php

declare(strict_types=1);

namespace App\Providers;

use App\Events\Bookings\BookingCancelled;
use App\Events\Bookings\BookingCreated;
use App\Events\Events\EventCreated;
use App\Events\Events\EventDeleted;
use App\Events\Events\EventUpdated;
use App\Events\FacebookUserDeauthorized;
use App\Events\Integrations\GoogleAccessTokenRefreshed;
use App\Events\Integrations\ZoomAccessTokenRefreshed;
use App\Events\ZoomUserDeauthorized;
use App\Listeners\Bookings\CreateGoogleCalendarEventForBooking;
use App\Listeners\Bookings\CreateZoomMeeting;
use App\Listeners\Bookings\DeleteGoogleCalendarEvent;
use App\Listeners\Bookings\DeleteZoomMeeting;
use App\Listeners\Bookings\SendBookingCancelledEmail;
use App\Listeners\Bookings\SendBookingCreatedEmailToHost;
use App\Listeners\Bookings\SendBookingCreatedEmailToInvitees;
use App\Listeners\Integrations\UpdateRefreshedGoogleAccessToken;
use App\Listeners\Integrations\UpdateRefreshedZoomAccessToken;
use App\Listeners\User\BootstrapUser;
use App\Listeners\User\SendDeauthorizationNotification;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use SocialiteProviders\Manager\SocialiteWasCalled;
use SocialiteProviders\Microsoft\MicrosoftExtendSocialite;
use SocialiteProviders\YottaHQ\YottaHQExtendSocialite;
use SocialiteProviders\Zoom\ZoomExtendSocialite;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            BootstrapUser::class,

            // Replace SendEmailVerificationNotification with welcome email
            //            SendEmailVerificationNotification::class,
        ],
        BookingCreated::class => [
            CreateGoogleCalendarEventForBooking::class,
            CreateZoomMeeting::class,
            SendBookingCreatedEmailToHost::class,
            SendBookingCreatedEmailToInvitees::class,
        ],
        BookingCancelled::class => [
            SendBookingCancelledEmail::class,
            DeleteGoogleCalendarEvent::class,
            DeleteZoomMeeting::class,
        ],
        SocialiteWasCalled::class => [
            ZoomExtendSocialite::class.'@handle',
            MicrosoftExtendSocialite::class.'@handle',
            YottaHQExtendSocialite::class.'@handle',
        ],
        GoogleAccessTokenRefreshed::class => [
            UpdateRefreshedGoogleAccessToken::class,
        ],
        ZoomAccessTokenRefreshed::class => [
            UpdateRefreshedZoomAccessToken::class,
        ],
        FacebookUserDeauthorized::class => [
            SendDeauthorizationNotification::class,
        ],
        ZoomUserDeauthorized::class => [
            SendDeauthorizationNotification::class,
        ],
        EventCreated::class => [],
        EventUpdated::class => [],
        EventDeleted::class => [],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     *
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return false;
    }
}
