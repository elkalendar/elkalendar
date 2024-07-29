<?php

declare(strict_types=1);

namespace App\Traits;

trait HasEnumMethods
{
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function keys(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function forSelect(): array
    {
        return array_combine(
            array_column(self::cases(), 'name'),
            array_column(self::cases(), 'value'),
        );
    }
}
