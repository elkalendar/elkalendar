<?php

declare(strict_types=1);

namespace App\Services;

use App\Enum\Integrations;
use App\Repositories\EventsRepository;
use App\Repositories\IntegrationsRepository;
use Illuminate\Support\Facades\DB;

class IntegrationsService
{
    public function __construct(
        private IntegrationsRepository $integrationsRepository,
        private EventsRepository $eventsRepository,
    ) {
    }

    public function deleteIntegration(string $integrationId)
    {
        $integration = $this->integrationsRepository->findByHashidOrFail($integrationId);
        $events = $this->eventsRepository->getUserEvents();

        DB::transaction(function () use ($integration, $events) {
            foreach ($events as $event) {
                if ($integration->provider === Integrations::PROVIDER_GOOGLE_CALENDAR) {
                    $this->eventsRepository->deleteEventLocationsByType($event, Integrations::PROVIDER_GOOGLE_CALENDAR);

                    continue;
                }

                if ($integration->provider === Integrations::PROVIDER_GOOGLE_MEET) {
                    $this->eventsRepository->deleteEventLocationsByType($event, Integrations::PROVIDER_GOOGLE_MEET);

                    continue;
                }

                $event->locations()->where('type', $integration->provider)->delete();
            }

            $this->integrationsRepository->getUserIntegrations($integration->provider_id);
        });

        event(new \App\Events\Integrations\IntegrationDeleted($integration));
    }
}
