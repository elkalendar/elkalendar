<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Modules\Availability\Http\Controllers\AddDayController;
use Modules\Availability\Http\Controllers\AvailabilitySchedulesController;
use Modules\Availability\Http\Controllers\IntervalController;
use Modules\Availability\Http\Controllers\RemoveDayController;

Route::group([
    'domain' => 'app.' . config('app.domain'),
    'middleware' => ['web', 'auth', 'verified', 'user.locale', 'inertia.private', 'onboarding.not-onboarded'],
], static function () {
    Route::name('availability.')
        ->prefix('availability')
        ->group(static function () {
            Route::get('/', [AvailabilitySchedulesController::class, 'index'])
                ->name('index');
            Route::post('/', [AvailabilitySchedulesController::class, 'store'])
                ->name('store');
            Route::get('{schedule}', [AvailabilitySchedulesController::class, 'edit'])
                ->name('edit');
            Route::post('{schedule}', [AvailabilitySchedulesController::class, 'update'])
                ->name('update');
            Route::delete('{schedule}', [AvailabilitySchedulesController::class, 'delete'])
                ->name('delete');
            Route::post('{schedule}/remove-day', RemoveDayController::class)
                ->name('removeDay');
            Route::post('{schedule}/add-day', AddDayController::class)
                ->name('addDay');
            Route::post('{schedule}/update-interval', [IntervalController::class, 'update'])
                ->name('updateInterval');
        });
});
