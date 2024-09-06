<?php

declare(strict_types=1);

namespace Modules\Availability\Http\Controllers;

use Modules\Availability\Actions\CreateScheduleAction;
use Modules\Availability\Http\Requests\AvailabilityCreateRequest;

class CreateAvailabilityScheduleController
{
    public function __invoke(AvailabilityCreateRequest $request, CreateScheduleAction $createAvailabilityAction)
    {
        $schedule = $createAvailabilityAction->execute($request->get('name'));

        return redirect()->route('availability.edit', $schedule->hashid);
    }
}
