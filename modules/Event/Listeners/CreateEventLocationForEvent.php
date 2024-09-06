<?php

declare(strict_types=1);

namespace Modules\Event\Listeners;

use App\Enum\EventLocationTypes;
use Modules\Event\Events\EventCreated;

class CreateEventLocationForEvent
{
    public function handle(EventCreated $event): void
    {
        $event->event->locations()->create([
            'type' => EventLocationTypes::TEXT,
            'settings' => [
                'text' => __('defaults.event_location_text'),
            ],
            'position' => 1,
        ]);
    }
}
