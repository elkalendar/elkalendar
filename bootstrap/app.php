<?php

declare(strict_types=1);

use App\Http\Middleware\HandleInertiaRequestsPrivate;
use App\Http\Middleware\HandleInertiaRequestsPublic;
use App\Http\Middleware\RedirectUserIfNotOnborded;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        apiPrefix: '',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'inertia.private' => HandleInertiaRequestsPrivate::class,
            'inertia.public' => HandleInertiaRequestsPublic::class,
            'onboarding.not-onboarded' => RedirectUserIfNotOnborded::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
