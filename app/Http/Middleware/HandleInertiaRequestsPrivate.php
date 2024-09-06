<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Modules\User\Http\Resources\UserResource;

class HandleInertiaRequestsPrivate extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     */
    public function share(Request $request): array
    {
        $data = [
            'locale' => app()->getLocale(),
            'isRtl' => isRTL(),
            'appName' => __('app.name'),
            'appUrl' => config('app.url'),
            'domain' => config('app.domain'),
            'domainWithScheme' => config('app.domain_with_scheme'),
            'auth' => [
                'user' => null,
            ],
            'flash' => function () {
                return [
                    'message' => [
                        'type' => session('messageType'),
                        'text' => session('messageText'),
                    ],
                ];
            },
            'errors' => function () use ($request) {
                return $this->resolveValidationErrors($request);
            },
            'year' => now()->year,
        ];

        if (auth()->user()) {
            $data['bookingsCount'] = auth()->user()->getBookingsCount();
            $data['auth']['user'] = UserResource::make(auth()->user());
        }

        return $data;
    }
}
