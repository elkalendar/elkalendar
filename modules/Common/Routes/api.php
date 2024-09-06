<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::domain('api.' . config('app.domain'))
    ->group(function () {
        Route::get('/', static function () {
            return response()->json([
                'message' => 'Hello World!',
            ]);
        });
    });
