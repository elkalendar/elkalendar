<?php

declare(strict_types=1);

namespace App\Services;

class ColorService
{
    public static function generateHex(): string
    {
        $hex = '#';

        for ($i = 0; $i < 6; $i++) {
            $hex .= dechex(random_int(0, 15));
        }

        return $hex;
    }
}
