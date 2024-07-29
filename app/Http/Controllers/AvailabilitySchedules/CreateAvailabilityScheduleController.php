<?php

declare(strict_types=1);

namespace App\Http\Controllers\AvailabilitySchedules;

use App\Actions\Availability\CreateAvailabilityAction;
use App\Http\Requests\Availability\AvailabilityCreateRequest;

class CreateAvailabilityScheduleController
{
    public function __invoke(AvailabilityCreateRequest $request, CreateAvailabilityAction $createAvailabilityAction)
    {
        $schedule = $createAvailabilityAction->execute($request->get('name'));

        return redirect()->route('availability.edit', $schedule->hashid);
    }
}
