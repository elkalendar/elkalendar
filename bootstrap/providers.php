<?php

declare(strict_types=1);

return [
    App\Providers\AppServiceProvider::class,
    SocialiteProviders\Manager\ServiceProvider::class,
    \Modules\Common\ServiceProvider::class,
    \Modules\Availability\ServiceProvider::class,
    \Modules\Booking\ServiceProvider::class,
    \Modules\Event\ServiceProvider::class,
    \Modules\User\ServiceProvider::class,
];
