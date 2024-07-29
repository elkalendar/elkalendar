<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Enum\Integrations;
use App\Models\Integration;

class IntegrationsRepository
{
    public function getUserIntegrations(?string $category = null)
    {
        if ($category) {
            return auth()->user()->integrations()->where('category', $category)->get();
        }

        return auth()->user()->integrations()->get();
    }

    public function getUserIntegrationsCount(?string $key = null)
    {
        $appIntegrationsCount = auth()->user()->integrations()->where('provider', $key);

        if ($key === Integrations::PROVIDER_GOOGLE_MEET) {
            $appIntegrationsCount = $appIntegrationsCount->orWhere('provider', Integrations::PROVIDER_GOOGLE_CALENDAR);
        }

        return $appIntegrationsCount->count();
    }

    public function findByHashidOrFail(string $hashId)
    {
        return auth()->user()->integrations()->findByHashidOrFail($hashId);
    }

    public function delete(string $providerId)
    {
        Integration::where('provider_id', $providerId)->delete();
    }
}
