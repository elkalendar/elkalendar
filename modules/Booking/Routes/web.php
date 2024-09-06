<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Modules\Booking\Http\Controllers\BookingController;
use Modules\Booking\Http\Controllers\CancelBookingController;
use Modules\Booking\Http\Controllers\CancelByHostController;
use Modules\Booking\Http\Controllers\DownloadBookingIcsController;
use Modules\Booking\Http\Controllers\RescheduleBookingController;
use Modules\Booking\Http\Controllers\ShowBookingController;

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

Route::group([
    'domain' => config('app.domain'),
    'middleware' => ['web', 'inertia.public'],
], static function () {
    Route::name('booking.')
        ->group(static function () {
            Route::get('bookings/{booking}', ShowBookingController::class)
                ->name('show-booking');
            Route::get('bookings/{booking}/download', DownloadBookingIcsController::class)
                ->name('download-ics');
            Route::post('bookings/{booking}/cancel-by-guest', CancelBookingController::class)
                ->name('cancelByGuest');
            Route::get('reschedule/{booking}', RescheduleBookingController::class)
                ->name('reschedule');
        });
});
