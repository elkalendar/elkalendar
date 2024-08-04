<?php

declare(strict_types=1);

namespace App\Providers;

use App\Events\Bookings\BookingCancelled;
use App\Events\Bookings\BookingCreated;
use App\Events\Events\EventCreated;
use App\Events\Events\EventDeleted;
use App\Events\Events\EventUpdated;
use App\Listeners\Bookings\SendBookingCancelledEmail;
use App\Listeners\Bookings\SendBookingCreatedEmailToHost;
use App\Listeners\Bookings\SendBookingCreatedEmailToInvitees;
use App\Listeners\CreateEventLocationForEvent;
use App\Listeners\User\BootstrapUser;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use SocialiteProviders\Manager\SocialiteWasCalled;
use SocialiteProviders\Microsoft\MicrosoftExtendSocialite;
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
            SendBookingCreatedEmailToHost::class,
            SendBookingCreatedEmailToInvitees::class,
        ],
        BookingCancelled::class => [
            SendBookingCancelledEmail::class,
        ],
        SocialiteWasCalled::class => [
            ZoomExtendSocialite::class.'@handle',
            MicrosoftExtendSocialite::class.'@handle',
        ],
        EventCreated::class => [
            CreateEventLocationForEvent::class,
        ],
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
