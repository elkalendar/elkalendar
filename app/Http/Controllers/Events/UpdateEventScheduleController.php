<?php

namespace App\Http\Controllers\Events;

use App\Http\Requests\Event\EventUpdateScheduleRequest;
use App\Models\Event;

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
