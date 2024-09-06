<?php

declare(strict_types=1);

namespace Modules\Event\Http\Controllers;

use App\Models\Event;
use Modules\Event\Http\Requests\EventUpdateScheduleRequest;

class UpdateEventScheduleController
{
    public function __invoke(Event $event, EventUpdateScheduleRequest $request)
    {
        $schedule = auth()->user()->schedules()->findByHashidOrFail($request->get('scheduleId'));

        $event->update([
            'schedule_id' => $schedule->id,
        ]);
    }
}
