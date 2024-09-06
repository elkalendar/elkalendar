<?php

declare(strict_types=1);

/**
 * Check if the current locale is arabic
 */
function isRTL(): bool
{
    return app()->getLocale() === 'ar';
}

function publicUrl(?string $path): string
{
    return config('app.domain_with_scheme').'/'.$path;
}

/**
 * @throws Exception
 */
function generateColorHex(): string
{
    $hex = '#';

    for ($i = 0; $i < 6; $i++) {
        $hex .= dechex(random_int(0, 15));
    }

    return $hex;
}
