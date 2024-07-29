<?php

use App\Rest\Controllers\UsersController;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Lomkit\Rest\Facades\Rest;

Route::get('/', static function () {
    return response()->json([
        'message' => 'Hello World!',
    ]);
});

Route::group(['middleware' => 'auth:sanctum'], static function () {
    Route::get('/user', static function (Request $request) {
        return $request->user();
    });
});

Rest::resource('users', UsersController::class);
