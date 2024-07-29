<?php

declare(strict_types=1);

namespace App\Actions\Events;

use App\Models\Event;
use Illuminate\Support\Str;

class EventUpdateAction
{
    public function execute(
        Event $event,
        ?string $slug,
        string $name,
        ?string $description,
        int $duration,
        string $color,
        bool $isVisible = true,
    ) {
        $slug = $slug ? Str::slug($slug) : Str::slug($name);

        $event->update([
            'name' => $name,
            'slug' => $slug,
            'description' => $description,
            'duration' => $duration,
            'color' => $color,
            'show_in_profile' => $isVisible,
        ]);
    }
}
