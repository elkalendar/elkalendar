<?php

declare(strict_types=1);

namespace Modules\Availability\Actions;

use App\Exceptions\OnlyAvailableScheduleDeleteException;
use App\Models\Event;
use App\Models\Schedule;
use Modules\Availability\Events\ScheduleDeleted;

class DeleteScheduleAction
{
    /**
     * @throws OnlyAvailableScheduleDeleteException
     */
    public function execute(
        Schedule $schedule,
    ): void {
        if (auth()->user()->schedules()->count() === 1) {
            throw new OnlyAvailableScheduleDeleteException();
        }

        $firstDifferentSchedule = auth()->user()->schedules()->whereNot('id', $schedule->id)->first();

        if ($schedule->is_default) {
            $firstDifferentSchedule->update([
                'is_default' => 1,
            ]);
        }

        Event::query()->where('schedule_id', $schedule->id)->update([
            'schedule_id' => $firstDifferentSchedule->id,
        ]);

        $schedule->delete();

        event(new ScheduleDeleted($schedule));
    }
}
