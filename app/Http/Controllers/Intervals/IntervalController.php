<?php

declare(strict_types=1);

namespace App\Http\Controllers\Intervals;

use App\Actions\Interval\UpdateIntervalAction;
use App\Http\Requests\Availability\AvailabilityUpdateIntervalRequest;
use App\Models\Schedule;

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
