<?php

declare(strict_types=1);

namespace App\Http\Controllers\AvailabilitySchedules;

use App\Actions\Availability\AddDayAction;
use App\Http\Requests\Availability\AvailabilityAddDayRequest;
use App\Models\Schedule;

class AddDayController
{
    public function __invoke(
        Schedule $schedule,
        AvailabilityAddDayRequest $request,
        AddDayAction $addDayAction,
    ) {
        $addDayAction->execute($schedule, $request->get('day'));
    }
}
