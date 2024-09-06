<?php

declare(strict_types=1);

namespace Tests\Unit\Modules\Availability\Actions;

use App\Models\Schedule;
use Modules\Availability\Actions\AddDayAction;
use PHPUnit\Framework\TestCase;

class AddDayActionTest extends TestCase
{
    public function testExecuteAddsDayWithCorrectTimes()
    {
        $schedule = $this->createMock(Schedule::class);
        $intervals = $this->createMock(\Illuminate\Database\Eloquent\Relations\HasMany::class);

        $schedule->method('intervals')->willReturn($intervals);

        $expectedData = [
            'day' => 'monday',
            'from' => '09:00',
            'to' => '17:00',
        ];

        $intervals->expects($this->once())
            ->method('create')
            ->with($this->equalTo($expectedData))
            ->willReturnCallback(function ($data) use ($expectedData) {
                $this->assertEquals($expectedData, $data, 'Intervals create method called with incorrect data');
                return true;
            });

        $action = new AddDayAction();

        $action->execute($schedule, 'monday');
    }
}
