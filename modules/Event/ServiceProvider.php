<?php

declare(strict_types=1);

namespace Modules\Event;

use Illuminate\Support\ServiceProvider as BaseServiceProvider;

class ServiceProvider extends BaseServiceProvider
{
    public function register(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/Database/Migrations');
        $this->loadRoutesFrom(__DIR__ . '/Routes/web.php');
        $this->mergeConfigFrom(__DIR__ . '/config.php', 'event');
    }

    public function boot(): void
    {
    }
}
