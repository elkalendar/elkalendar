<?php

declare(strict_types=1);

namespace App\Actions\Availability;

use App\Services\AvailabilitySchedule\AvailabilityScheduleService;

class CreateAvailabilityAction
{
    public function __construct(public AvailabilityScheduleService $availabilityService)
    {
    }

    public function execute(string $name)
    {
        return $this->availabilityService->create($name);
    }
}
