<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Illuminate\Http\Request;

class SetLanguageBasedOnUserSettingMiddleware
{
    public function handle(Request $request, \Closure $next)
    {
        if (! $request->user()) {
            return $next($request);
        }

        app()->setLocale(auth()->user()->settings()->get('language'));

        return $next($request);
    }
}
