<?php

declare(strict_types=1);

namespace Modules\Availability\Http\Controllers;

use App\Enum\Timezones;
use App\Exceptions\OnlyAvailableScheduleDeleteException;
use App\Models\Schedule;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Modules\Availability\Actions\CreateScheduleAction;
use Modules\Availability\Actions\DeleteScheduleAction;
use Modules\Availability\Actions\UpdateScheduleAction;
use Modules\Availability\Http\Requests\AvailabilityCreateRequest;
use Modules\Availability\Http\Requests\AvailabilityUpdateRequest;

class AvailabilitySchedulesController
{
    public function index(): \Inertia\Response
    {
        $schedules = auth()->user()->schedules()->with(['intervals'])->orderBy('is_default', 'desc')->get();

        return Inertia::render('Availability/Index', [
            'schedules' => \Modules\User\Http\Resources\ScheduleResource::collection($schedules),
        ]);
    }

    public function store(
        AvailabilityCreateRequest $request,
        CreateScheduleAction $createAvailabilityAction,
    ): \Illuminate\Http\RedirectResponse {
        $schedule = $createAvailabilityAction->execute($request->validated('name'));

        return redirect()->route('availability.edit', $schedule->hashid);
    }

    public function edit(Schedule $schedule): \Inertia\Response
    {
        $timezones = collect(Timezones::ALL)->map(function ($item) {
            return [
                'value' => $item['value'],
                'label' => $item['label_ar'],
            ];
        })->toArray();

        return Inertia::render('Availability/Edit', [
            'schedule' => \Modules\User\Http\Resources\ScheduleResource::make($schedule),
            'timezones' => $timezones,
        ]);
    }

    public function update(
        Schedule $schedule,
        AvailabilityUpdateRequest $request,
        UpdateScheduleAction $action,
    ) {
        $action->execute(
            $schedule,
            $request->validated('name'),
            $request->validated('timezone'),
            $request->validated('isDefault'),
        );
    }

    public function destroy(Schedule $schedule, DeleteScheduleAction $action)
    {
        try {
            $action->execute($schedule);
        } catch (OnlyAvailableScheduleDeleteException $e) {
            Log::error($e->getMessage());

            return redirect()->back()->withErrors([
                'scheduleError' => __('messages.schedule.default_schedule_delete_error'),
            ]);
        }
    }
}
