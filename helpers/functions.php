<?php

declare(strict_types=1);

/**
 * Check if the current locale is arabic
 */
function isRTL(): bool
{
    return app()->getLocale() === 'ar';
}

function publicUrl(string $path): string
{
    return config('app.short_domain_with_scheme').'/'.$path;
}
