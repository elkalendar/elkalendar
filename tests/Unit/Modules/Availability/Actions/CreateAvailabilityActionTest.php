<?php

declare(strict_types=1);

namespace Tests\Unit\Modules\Availability\Actions;

use Modules\Availability\Actions\CreateScheduleAction;
use Modules\Availability\Services\AvailabilityScheduleService;
use PHPUnit\Framework\TestCase;

class CreateAvailabilityActionTest extends TestCase
{
    public function testExecuteCallsCreateOnServiceWithCorrectName()
    {
        $availabilityService = $this->createMock(AvailabilityScheduleService::class);
        $availabilityService->expects($this->once())
            ->method('create')
            ->with($this->equalTo('Test Availability'))
            ->willReturn(true);

        $action = new CreateScheduleAction($availabilityService);

        $result = $action->execute('Test Availability');

        $this->assertTrue($result, 'The execute method should return true as simulated by the service mock.');
    }
}
