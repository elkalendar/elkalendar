<?php

declare(strict_types=1);

use App\Http\Controllers\OAuthController;
use App\Http\Controllers\Socialite\FacebookDeauthorizationController;
use App\Http\Controllers\Socialite\ZoomDeauthorizationController;
use App\Http\Controllers\UserController;

Route::get('login', [OAuthController::class, 'login'])
    ->middleware(['guest'])
    ->name('login');
Route::get('login/callback', [OAuthController::class, 'callback'])
    ->middleware(['guest'])
    ->name('login.callback');

Route::get('logout', [UserController::class, 'logout'])
    ->middleware('auth')
    ->name('logout');

Route::post('deauthorize/facebook', [FacebookDeauthorizationController::class, 'deauthorizeFacebook'])
    ->name('deauthorize.facebook');
Route::post('deauthorize/zoom', [ZoomDeauthorizationController::class, 'deauthorize'])
    ->name('deauthorize.zoom');
