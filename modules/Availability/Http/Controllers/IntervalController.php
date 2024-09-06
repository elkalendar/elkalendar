<?php

declare(strict_types=1);

namespace Modules\Availability\Http\Controllers;

use App\Models\Schedule;
use Modules\Availability\Actions\UpdateIntervalAction;
use Modules\Availability\Http\Requests\AvailabilityUpdateIntervalRequest;

class IntervalController
{
    public function update(
        Schedule $schedule,
        AvailabilityUpdateIntervalRequest $request,
        UpdateIntervalAction $updateIntervalAction,
    ): \Illuminate\Http\RedirectResponse {
        $updateIntervalAction->execute(
            $schedule,
            $request->get('day'),
            $request->get('from'),
            $request->get('to'),
        );

        return redirect()->back();
    }
}
