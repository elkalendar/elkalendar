<?php

declare(strict_types=1);

namespace Tests\Unit\Modules\Availability\Actions;

use App\Models\Schedule;
use Illuminate\Foundation\Testing\Concerns\InteractsWithExceptionHandling;
use Mockery as m;
use Modules\Availability\Actions\UpdateIntervalAction;
use Modules\Availability\Services\IntervalService;
use Tests\TestCase;

class UpdateIntervalActionTest extends TestCase
{
    use InteractsWithExceptionHandling;

    public function tearDown(): void
    {
        parent::tearDown();
        m::close();
    }

    public function testExecuteUpdatesIntervalCorrectly()
    {
        $intervalService = m::mock(IntervalService::class);

        $action = new UpdateIntervalAction($intervalService);

        $schedule = m::mock(Schedule::class);
        $intervals = m::mock();

        $day = 'Monday';
        $from = '09:00';
        $to = '17:00';

        $schedule->shouldReceive('intervals')
            ->once()
            ->andReturn($intervals);

        $intervals->shouldReceive('where')
            ->with('day', $day)
            ->andReturn($intervals);

        $interval = m::mock();
        $intervals->shouldReceive('firstOrFail')
            ->once()
            ->andReturn($interval);

        $interval->shouldReceive('update')
            ->with(['from' => $from, 'to' => $to])
            ->once();

        $action->execute($schedule, $day, $from, $to);

        $interval->shouldHaveReceived('update')
            ->with(['from' => $from, 'to' => $to])
            ->once();

        $this->assertTrue(true, 'Interval update method was called successfully.'); // Example, doesn't do much here.
    }
}
