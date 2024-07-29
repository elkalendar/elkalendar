<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enum\AppCategories;
use App\Http\Resources\AppResource;
use App\Http\Resources\IntegrationResource;
use App\Repositories\AppsRepository;
use App\Repositories\IntegrationsRepository;
use App\Services\IntegrationsService;
use Inertia\Inertia;

class AppsController
{
    public function __construct(
        private AppsRepository $appsRepository,
        private IntegrationsRepository $integrationsRepository,
        private IntegrationsService $integrationsService,
    ) {
    }

    public function index(): \Inertia\Response
    {
        $apps = $this->appsRepository->all();

        return Inertia::render('Apps/Index', [
            'categories' => AppCategories::getAllTranslated(),
            'apps' => AppResource::collection($apps),
        ]);
    }

    public function connected(): \Inertia\Response
    {
        $integrations = $this->integrationsRepository->getUserIntegrations();

        return Inertia::render('Apps/Connected', [
            'categories' => AppCategories::getAllTranslated(),
            'integrations' => IntegrationResource::collection($integrations),
        ]);
    }

    public function filter(string $category): \Inertia\Response|\Illuminate\Http\RedirectResponse
    {
        if ($category === 'all') {
            return redirect()->route('apps.index');
        }

        $apps = $this->appsRepository->all();
        $apps = collect($apps)->where('category', $category)->values();

        return Inertia::render('Apps/Index', [
            'category' => $category,
            'categories' => AppCategories::getAllTranslated(),
            'apps' => AppResource::collection($apps),
        ]);
    }

    public function filterConnected(string $category): \Inertia\Response|\Illuminate\Http\RedirectResponse
    {
        if ($category === 'all') {
            return redirect()->route('connected');
        }

        $integrations = $this->integrationsRepository->getUserIntegrations($category);

        return Inertia::render('Apps/Connected', [
            'category' => $category,
            'categories' => AppCategories::getAllTranslated(),
            'integrations' => IntegrationResource::collection($integrations),
        ]);
    }

    public function show(string $key): \Inertia\Response
    {
        $app = $this->appsRepository->one($key);

        if (! $app) {
            abort(404);
        }

        $appIntegrationsCount = $this->integrationsRepository->getUserIntegrationsCount($key);

        return Inertia::render('Apps/Show', [
            'app' => AppResource::make($app),
            'appIntegrationsCount' => $appIntegrationsCount,
        ]);
    }

    public function disconnect(string $integrationId)
    {
        $this->integrationsService->deleteIntegration($integrationId);
    }

    public function updateSettings(string $integrationId)
    {
        $validated = request()->validate([
            'sync_bookings' => 'nullable|boolean',
        ]);

        $integration = auth()->user()->integrations()->findByHashidOrFail($integrationId);

        foreach ($validated as $key => $value) {
            $integration->settings()->set($key, $value);
        }
    }
}
