<?php

declare(strict_types=1);

namespace Modules\Booking;

use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;
use Modules\Booking\Events\BookingCancelled;
use Modules\Booking\Events\BookingCreated;
use Modules\Booking\Listeners\SendBookingCancelledEmailToInvitees;
use Modules\Booking\Listeners\SendBookingCancelledEmailToHost;
use Modules\Booking\Listeners\SendBookingCreatedEmailToHost;
use Modules\Booking\Listeners\SendBookingCreatedEmailToInvitees;

class ServiceProvider extends BaseServiceProvider
{
    public function register(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/Database/Migrations');
        $this->loadRoutesFrom(__DIR__ . '/Routes/web.php');
        $this->mergeConfigFrom(__DIR__ . '/config.php', 'booking');
    }

    public function boot(): void
    {
        Event::listen(BookingCreated::class, [
            SendBookingCreatedEmailToHost::class,
            SendBookingCreatedEmailToInvitees::class,
        ]);

        Event::listen(BookingCancelled::class, [
            SendBookingCancelledEmailToHost::class,
            SendBookingCancelledEmailToInvitees::class,
        ]);
    }
}
