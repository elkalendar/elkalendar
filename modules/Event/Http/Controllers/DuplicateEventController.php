<?php

declare(strict_types=1);

namespace Modules\Event\Http\Controllers;

use App\Models\Event;
use Illuminate\Support\Str;
use Modules\Event\Events\EventDuplicated;

class DuplicateEventController
{
    public function __invoke(Event $event): void
    {
        $newEvent = $event->replicate();
        $newEvent->name = $event->name.' - Copy';
        $newEvent->slug = Str::slug($event->name.'-'.Str::random(5));
        $newEvent->color = generateColorHex();
        $newEvent->save();

        // TODO: duplicate event locations

        event(new EventDuplicated($event, $newEvent));
    }
}
