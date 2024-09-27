<?php

declare(strict_types=1);

use App\Http\Controllers\PagesController;
use App\Http\Controllers\TranslationController;
use Illuminate\Support\Facades\Route;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Modules\Booking\Http\Controllers\BookEventController;
use Modules\Booking\Http\Controllers\CancelBookingController;
use Modules\Booking\Http\Controllers\DownloadBookingIcsController;
use Modules\Booking\Http\Controllers\RescheduleBookingController;
use Modules\Booking\Http\Controllers\ShowBookingController;
use Modules\Public\Http\Controllers\ShowEventController;
use Modules\Public\Http\Controllers\ShowUserProfileController;

Route::group([
    'domain' => config('app.domain'),
    'prefix' => LaravelLocalization::setLocale(),
    'middleware' => ['web', 'localeSessionRedirect', 'localizationRedirect', 'localeViewPath'],
], static function () {
    Route::get('/', [PagesController::class, 'home'])->name('home');
});

Route::middleware(['web', 'user.locale'])->get('i18next/fetch', TranslationController::class);

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

Route::group([
    'domain' => config('app.domain'),
    'middleware' => ['web', 'inertia.public'],
], static function () {
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
