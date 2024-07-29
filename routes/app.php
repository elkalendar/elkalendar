<?php

declare(strict_types=1);

use App\Http\Controllers\AppsController;
use App\Http\Controllers\AvailabilitySchedules\AddDayController;
use App\Http\Controllers\AvailabilitySchedules\CreateAvailabilityScheduleController;
use App\Http\Controllers\AvailabilitySchedules\RemoveDayController;
use App\Http\Controllers\AvailabilitySchedulesController;
use App\Http\Controllers\Booking\CancelByHostController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventLocationsController;
use App\Http\Controllers\Events\EventsController;
use App\Http\Controllers\Events\UpdateEventScheduleController;
use App\Http\Controllers\Intervals\IntervalController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\Socialite\SocialiteController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\RedirectUserIfNotOnborded;
use Illuminate\Support\Facades\Route;

require __DIR__.'/auth.php';

Route::group([
    'middleware' => ['auth'],
], static function () {
    require_once __DIR__.'/onboarding.php';

    Route::get('bookings/{bookingId}/download', [BookingController::class, 'downloadIcs'])
        ->name('download-ics');

    Route::group([
//        'middleware' => [RedirectUserIfNotOnborded::class],
    ], static function () {

        Route::get('/', DashboardController::class)
            ->name('dashboard');

        Route::group([
            'prefix' => 'events',
            'name' => 'events.',
        ], function () {
            Route::get('/', [EventsController::class, 'index'])->name('index');
            Route::post('/', [EventsController::class, 'store'])->name('store');
            Route::get('{event}/edit', [EventsController::class, 'edit'])->name('edit');
            Route::put('{event}', [EventsController::class, 'update'])->name('update');
            Route::delete('{event}', [EventsController::class, 'destroy'])->name('destroy');
        });

        Route::put('events/{event}/update-schedule', UpdateEventScheduleController::class)
            ->name('events.update-schedule');

        Route::name('events.locations.')
            ->prefix('events/{eventId}/locations')
            ->group(static function () {
                Route::post('custom-text', [EventLocationsController::class, 'setCustomText'])
                    ->name('set-custom-text');
                Route::post('link', [EventLocationsController::class, 'setLink'])
                    ->name('set-link');
                Route::post('in-person-host', [EventLocationsController::class, 'setInpersonHost'])
                    ->name('in-person-host');
                Route::post('in-person-guest', [EventLocationsController::class, 'setInpersonGuest'])
                    ->name('in-person-guest');
                Route::post('google-meet', [EventLocationsController::class, 'setGoogleMeet'])
                    ->name('google-meet');
                Route::post('zoom', [EventLocationsController::class, 'setZoom'])
                    ->name('zoom');
                Route::delete('{locationId}', [EventLocationsController::class, 'deleteLocation'])
                    ->name('delete');
            });
        Route::post('user/resend-verification-email', [UserController::class, 'resend'])
            ->name('resend');

        Route::name('availability.')
            ->prefix('availability')
            ->group(static function () {
                Route::get('/', [AvailabilitySchedulesController::class, 'index'])
                    ->name('index');
                Route::post('/', CreateAvailabilityScheduleController::class)
                    ->name('create');
                Route::get('{schedule}', [AvailabilitySchedulesController::class, 'edit'])
                    ->name('edit');
                Route::post('{schedule}', [AvailabilitySchedulesController::class, 'update'])
                    ->name('update');
                Route::post('{schedule}/remove-day', RemoveDayController::class)
                    ->name('removeDay');
                Route::post('{schedule}/add-day', AddDayController::class)
                    ->name('addDay');
                Route::post('{schedule}/update-interval', [IntervalController::class, 'update'])
                    ->name('updateInterval');
                Route::delete('{schedule}', [AvailabilitySchedulesController::class, 'delete'])
                    ->name('delete');
            });

        Route::name('settings.')
            ->prefix('settings')
            ->group(static function () {
                Route::get('general', [SettingsController::class, 'general'])
                    ->name('general');
                Route::post('general', [SettingsController::class, 'saveGeneral'])
                    ->name('saveGeneral');

                Route::get('calendars', [SettingsController::class, 'calendars'])
                    ->name('calendars');

                Route::get('appearance', [SettingsController::class, 'appearance'])
                    ->name('appearance');

                Route::get('public-page', [SettingsController::class, 'publicPage'])
                    ->name('publicPage');
                Route::post('public-page', [SettingsController::class, 'savePublicPage'])
                    ->name('savePublicPage');

                Route::get('notifications', [SettingsController::class, 'notifications'])
                    ->name('notifications');

                Route::post('appearance', [SettingsController::class, 'saveAppearance'])
                    ->name('saveAppearance');
            });

        Route::name('bookings.')
            ->prefix('bookings')
            ->group(static function () {
                Route::get('/', [BookingController::class, 'index'])->name('index');
                Route::post('{booking}/cancel', CancelByHostController::class)->name('cancelByHost');
            });

        Route::name('apps.')
            ->prefix('apps')
            ->group(static function () {
                Route::get('/', [AppsController::class, 'index'])
                    ->name('index');
                Route::get('details/{key}', [AppsController::class, 'show'])
                    ->name('show');
                Route::get('connect/{key}', [SocialiteController::class, 'connect'])
                    ->name('connect');
                Route::get('connect/{key}/callback', [SocialiteController::class, 'callback'])
                    ->name('connectCallback');
                Route::get('{category}', [AppsController::class, 'filter'])
                    ->name('filter');
            });
        Route::get('connected-apps', [AppsController::class, 'connected'])
            ->name('connected');
        Route::get('connected-apps/{category}', [AppsController::class, 'filterConnected'])
            ->name('filterConnected');
        Route::delete('connected-apps/{integrationId}/disconnect', [AppsController::class, 'disconnect']);
        Route::post('connected-apps/{integrationId}/settings', [AppsController::class, 'updateSettings'])
            ->name('updateSettings');
    });
});
