<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Modules\Event\Http\Controllers\DuplicateEventController;
use Modules\Event\Http\Controllers\EventLocationsController;
use Modules\Event\Http\Controllers\EventsController;
use Modules\Event\Http\Controllers\UpdateEventScheduleController;

Route::group([
    'domain' => 'app.' . config('app.domain'),
    'middleware' => ['web', 'auth', 'verified', 'user.locale', 'inertia.private', 'onboarding.not-onboarded'],
], static function () {
    Route::resource('events', EventsController::class, [
        'except' => ['create', 'show'],
    ]);

    Route::post('events/{event}/duplicate', DuplicateEventController::class);

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
});
