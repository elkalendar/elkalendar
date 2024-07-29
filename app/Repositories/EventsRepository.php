<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Event;

class EventsRepository
{
    public function getUserEvents()
    {
        return auth()->user()->events;
    }

    public function deleteEventLocationsByType(Event $event, string $type)
    {
        $event->locations()->where('type', $type)->delete();
    }
}
