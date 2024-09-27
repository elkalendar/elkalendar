<?php

declare(strict_types=1);

namespace Modules\Public;

use Illuminate\Support\ServiceProvider as BaseServiceProvider;

class ServiceProvider extends BaseServiceProvider
{
    public function register(): void
    {
        $this->loadRoutesFrom(__DIR__ . '/Routes/api.php');
        $this->loadRoutesFrom(__DIR__ . '/Routes/web.php');
        $this->mergeConfigFrom(__DIR__ . '/config.php', 'public');
    }

    public function boot(): void
    {
    }
}
