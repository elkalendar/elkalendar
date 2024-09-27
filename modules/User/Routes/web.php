<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Modules\User\Http\Controllers\AuthenticatedSessionController;
use Modules\User\Http\Controllers\ConfirmablePasswordController;
use Modules\User\Http\Controllers\EmailController;
use Modules\User\Http\Controllers\EmailVerificationNotificationController;
use Modules\User\Http\Controllers\EmailVerificationPromptController;
use Modules\User\Http\Controllers\NewPasswordController;
use Modules\User\Http\Controllers\OnboardingController;
use Modules\User\Http\Controllers\PasswordController;
use Modules\User\Http\Controllers\PasswordResetLinkController;
use Modules\User\Http\Controllers\PersonalInformationController;
use Modules\User\Http\Controllers\PublicProfileController;
use Modules\User\Http\Controllers\RegisteredUserController;
use Modules\User\Http\Controllers\SettingsController;
use Modules\User\Http\Controllers\UserController;
use Modules\User\Http\Controllers\VerifyEmailController;

Route::group([
    'domain' => 'app.' . config('app.domain'),
    'middleware' => ['web', 'inertia.public']
], static function () {
    Route::middleware('guest')->group(function () {
        Route::get('register', [RegisteredUserController::class, 'create'])
            ->name('register');

        Route::post('register', [RegisteredUserController::class, 'store'])
            ->name('register.handle');

        Route::get('login', [AuthenticatedSessionController::class, 'create'])
            ->name('login');

        Route::post('login', [AuthenticatedSessionController::class, 'store'])
            ->name('login.handle');

        Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
            ->name('password.request');

        Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
            ->name('password.email');

        Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
            ->name('password.reset');

        Route::post('reset-password', [NewPasswordController::class, 'store'])
            ->name('password.store');
    });

    Route::middleware(['auth', 'user.locale'])->group(function () {
        Route::get('verify-email', EmailVerificationPromptController::class)
            ->name('verification.notice');

        Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
            ->middleware(['signed', 'throttle:6,1'])
            ->name('verification.verify');

        Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
            ->middleware('throttle:6,1')
            ->name('verification.send');

        Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
            ->name('password.confirm');

        Route::post('confirm-password', [ConfirmablePasswordController::class, 'store'])
            ->name('password.confirm.handle');

        Route::put('password', [PasswordController::class, 'update'])->name('password.update');

        Route::delete('logout', [AuthenticatedSessionController::class, 'destroy'])
            ->name('logout');

        Route::delete('user/public-avatar', [PublicProfileController::class, 'destroyPublicAvatar']);
    });
});

Route::group([
    'domain' => 'app.' . config('app.domain'),
    'middleware' => ['web', 'auth', 'verified', 'user.locale', 'inertia.private'],
], static function () {
    Route::name('onboarding.')
        ->prefix('onboarding')
        ->group(static function () {
            Route::get('/intro', [OnboardingController::class, 'intro'])->name('intro');
            Route::get('/step1', [OnboardingController::class, 'step1'])->name('step1');
            Route::get('/final', [OnboardingController::class, 'final'])->name('final');

            Route::post('/intro', [OnboardingController::class, 'handleIntro'])->name('handleIntro');
            Route::post('/step1', [OnboardingController::class, 'handleStep1'])->name('handleStep1');
        });

    Route::post('user/resend-verification-email', [UserController::class, 'resend'])
        ->name('resend');

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

            Route::get('/personal-information', [PersonalInformationController::class, 'show'])
                ->name('personalInformation.show');
            Route::post('/personal-information', [PersonalInformationController::class, 'update'])
                ->name('personalInformation.update');

            Route::get('email', [EmailController::class, 'show'])->name('email.show');
            Route::post('email', [EmailController::class, 'update'])->name('email.update');

            Route::get('password', [PasswordController::class, 'show'])->name('user.password.show');
            Route::put('password', [PasswordController::class, 'update'])->name('user.password.update');
        });
});
