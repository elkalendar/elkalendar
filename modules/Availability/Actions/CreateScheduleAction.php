<?php

declare(strict_types=1);

namespace Modules\Availability\Actions;

use Modules\Availability\Services\AvailabilityScheduleService;

class CreateScheduleAction
{
    public function __construct(public AvailabilityScheduleService $availabilityService)
    {
    }

    public function execute(string $name)
    {
        return $this->availabilityService->create($name);
    }
}
