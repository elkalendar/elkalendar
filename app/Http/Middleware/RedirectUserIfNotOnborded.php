<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RedirectUserIfNotOnborded
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        if (! auth()->user()->onboarding()->finished()) {
            return redirect()->to(
                auth()->user()->onboarding()->nextUnfinishedStep()->link
            );
        }

        return $next($request);
    }
}
