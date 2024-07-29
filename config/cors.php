<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['*', 'api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => [
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE',
        'OPTIONS',
    ],

    'allowed_origins' => [
        '*.elkalendar.*',
        '*.nashrify.*',
        '*.yottahq.*',
    ],

    'allowed_origins_patterns' => [
        '*.elkalendar.*',
        '*.nashrify.*',
        '*.yottahq.*',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => ['x-inertia'],

    'max_age' => 0,

    'supports_credentials' => false,

];
