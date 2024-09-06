<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfOnboardingComplete
{
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->user()->onboarding()->finished()) {
            return redirect('/');
        }

        return $next($request);
    }
}
