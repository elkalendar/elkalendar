<?php

declare(strict_types=1);

namespace Modules\Availability\Http\Controllers;

use App\Models\Schedule;
use Modules\Availability\Actions\AddDayAction;
use Modules\Availability\Http\Requests\AvailabilityAddDayRequest;

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
