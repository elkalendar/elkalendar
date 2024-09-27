<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Modules\Common\Http\Controllers\DashboardController;

Route::group([
    'domain' => 'app.'.config('app.domain'),
    'middleware' => ['web', 'auth', 'verified', 'user.locale', 'inertia.private'],
], static function () {
    Route::group([
        'middleware' => ['onboarding.not-onboarded'],
    ], static function () {
        Route::get('/', DashboardController::class)
            ->name('dashboard');
    });
});
