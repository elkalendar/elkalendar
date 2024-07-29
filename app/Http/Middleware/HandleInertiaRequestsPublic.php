<?php

namespace App\Http\Middleware;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequestsPublic extends Middleware
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
            'appName' => config('app.name'),
            'appUrl' => config('app.url'),
            'domain' => config('app.domain'),
            'domainWithScheme' => config('app.domain_with_scheme'),
            'shortDomain' => config('app.short_domain'),
            'shortDomainWithScheme' => config('app.short_domain_with_scheme'),
            'accountsDomain' => config('app.accounts_domain_with_scheme'),
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
        ];

        if (auth()->user()) {
            $data['auth']['user'] = UserResource::make(auth()->user());
        }

        return $data;
    }
}
