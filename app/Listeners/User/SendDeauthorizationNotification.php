<?php

declare(strict_types=1);

namespace App\Listeners\User;

use App\Models\Integration;

class SendDeauthorizationNotification
{
    public function handle(object $event): void
    {
        $providerId = $event->userId;
        $user = Integration::with(['user'])
            ->where('provider_id', $providerId)
            ->first()
            ->user;

        $user->notify(new \App\Notifications\User\DeauthorizationNotification($event::class));
    }
}
