<?php

declare(strict_types=1);

namespace App\Actions\Events;

use App\Models\Event;
use Illuminate\Support\Str;

class CreateEventAction
{
    public function execute(
        ?string $slug,
        string $name,
        int $userId,
        int $duration,
        string $color,
        int $scheduleId,
    ) {
        $slug = $slug ? Str::slug($slug) : Str::slug($name);

        return Event::create([
            'user_id' => $userId,
            'name' => $name,
            'slug' => $slug,
            'duration' => $duration,
            'color' => $color,
            'schedule_id' => $scheduleId,
        ]);
    }
}
