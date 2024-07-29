<?php

declare(strict_types=1);

use App\Http\Controllers\OnboardingController;
use Illuminate\Support\Facades\Route;

Route::name('onboarding.')
    ->prefix('onboarding')
    ->group(static function () {
        Route::get('/intro', [OnboardingController::class, 'intro'])->name('intro');
        Route::get('/step1', [OnboardingController::class, 'step1'])->name('step1');
        Route::get('/final', [OnboardingController::class, 'final'])->name('final');

        Route::post('/intro', [OnboardingController::class, 'handleIntro'])->name('handleIntro');
        Route::post('/step1', [OnboardingController::class, 'handleStep1'])->name('handleStep1');
    });
