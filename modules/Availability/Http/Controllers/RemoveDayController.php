<?php

declare(strict_types=1);

namespace Modules\Availability\Http\Controllers;

use App\Models\Schedule;
use Modules\Availability\Actions\RemoveDayAction;
use Modules\Availability\Http\Requests\AvailabilityRemoveDayRequest;

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
