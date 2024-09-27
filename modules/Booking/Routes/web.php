<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Modules\Booking\Http\Controllers\BookingController;
use Modules\Booking\Http\Controllers\CancelByHostController;
use Modules\Booking\Http\Controllers\DownloadBookingIcsController;

Route::group([
    'domain' => 'app.' . config('app.domain'),
    'middleware' => ['web', 'auth', 'verified', 'user.locale', 'inertia.private', 'onboarding.not-onboarded'],
], static function () {
    Route::name('bookings.')
        ->prefix('bookings')
        ->group(static function () {
            Route::get('/', [BookingController::class, 'index'])->name('index');
            Route::post('{booking}/cancel', CancelByHostController::class)->name('cancelByHost');
            Route::get('{booking}/download', DownloadBookingIcsController::class)
                ->name('download-ics');
        });
});
