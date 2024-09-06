<?php

declare(strict_types=1);

namespace Tests\Unit\Modules\Availability\Actions;

use App\Models\Schedule;
use Illuminate\Database\Query\Builder;
use Modules\Availability\Actions\RemoveDayAction;
use PHPUnit\Framework\TestCase;

class RemoveDayActionTest extends TestCase
{
    public function testExecuteRemovesDayIntervals()
    {
        $schedule = $this->createMock(Schedule::class);
        $queryBuilder = $this->createMock(\Illuminate\Database\Eloquent\Builder::class);

        $schedule->method('intervals')->willReturn($queryBuilder);
        $queryBuilder->method('where')->willReturn($queryBuilder);

        $queryBuilder->expects($this->once())
            ->method('where')
            ->with($this->equalTo('day'), $this->equalTo('Monday'))
            ->willReturn($queryBuilder)
            ->willReturnCallback(function ($field, $value) {
                $this->assertEquals('day', $field, "The field for 'where' method should be 'day'.");
                $this->assertEquals('Monday', $value, "The value for 'where' method should be 'Monday'.");
                return $this->getMockBuilder(Builder::class);
            });

        $queryBuilder->expects($this->once())
            ->method('delete')
            ->willReturn(true);

        $action = new RemoveDayAction();

        $action->execute($schedule, 'Monday');
    }
}
