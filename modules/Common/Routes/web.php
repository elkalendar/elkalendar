<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Modules\Common\Http\Controllers\DashboardController;
use Modules\Common\Http\Controllers\PagesController;
use Modules\Common\Http\Controllers\TranslationController;

Route::group([
    'domain' => config('app.domain'),
    'prefix' => LaravelLocalization::setLocale(),
    'middleware' => ['web', 'localizationRedirect', 'localeViewPath'],
], function () {
    Route::get('/', [PagesController::class, 'home'])->name('home');
});

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

Route::middleware(['web', 'user.locale'])->get('i18next/fetch', TranslationController::class);
