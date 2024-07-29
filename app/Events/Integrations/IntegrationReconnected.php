<?php

namespace App\Events\Integrations;

use App\Models\Integration;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class IntegrationReconnected
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;

    public function __construct(public readonly Integration $integration)
    {
    }

    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
