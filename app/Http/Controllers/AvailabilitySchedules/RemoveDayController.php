<?php

declare(strict_types=1);

namespace App\Http\Controllers\AvailabilitySchedules;

use App\Actions\Availability\RemoveDayAction;
use App\Http\Requests\Availability\AvailabilityRemoveDayRequest;
use App\Models\Schedule;

class RemoveDayController
{
    public function __invoke(
        Schedule $schedule,
        AvailabilityRemoveDayRequest $request,
        RemoveDayAction $action,
    ) {
        $action->execute($schedule, $request->get('day'));
    }
}
