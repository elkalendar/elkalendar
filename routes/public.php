<?php

declare(strict_types=1);

use App\Http\Controllers\Public\BookEventController;
use App\Http\Controllers\Public\CancelBookingController;
use App\Http\Controllers\Public\DownloadBookingIcsController;
use App\Http\Controllers\Public\RescheduleBookingController;
use App\Http\Controllers\Public\ShowBookingController;
use App\Http\Controllers\Public\ShowEventController;
use App\Http\Controllers\Public\ShowUserProfileController;

Route::get('/', [\App\Http\Controllers\PagesController::class, 'home'])->name('home');

Route::group([
    'domain' => config('app.domain'),
    'middleware' => ['inertia.public'],
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

    Route::name('user.')
        ->group(static function () {
            Route::get('{username}', ShowUserProfileController::class)
                ->name('events');
            Route::get('{username}/{slug}', ShowEventController::class)
                ->name('event');
            Route::post('{username}/{slug}', BookEventController::class)
                ->name('event.book');
        });
});


