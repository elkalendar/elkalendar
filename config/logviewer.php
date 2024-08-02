<?php

declare(strict_types=1);

return [
    'max_file_size' => 52428800, // size in Byte
    'pattern' => env('LOGVIEWER_PATTERN', '*.log'),
    'storage_path' => env('LOGVIEWER_STORAGE_PATH', storage_path('logs')),
];
