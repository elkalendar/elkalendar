<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Modules\Common\Http\Controllers\PagesController;

Route::group([
    'domain' => config('app.domain'),
    'prefix' => LaravelLocalization::setLocale(),
    'middleware' => ['web', 'localeSessionRedirect', 'localizationRedirect', 'localeViewPath'],
], function () {
    Route::get('/', [PagesController::class, 'home'])->name('home');
});
