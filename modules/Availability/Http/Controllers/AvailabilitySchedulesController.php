<?php

declare(strict_types=1);

namespace Modules\Availability\Http\Controllers;

use App\Enum\Timezones;
use App\Exceptions\OnlyScheduleDeleteException;
use App\Models\Schedule;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Modules\Availability\Http\Requests\AvailabilityUpdateRequest;
use Modules\Availability\Services\AvailabilityScheduleService;

class AvailabilitySchedulesController
{
    public function __construct(private AvailabilityScheduleService $availabilityScheduleService)
    {
    }

    public function index(): \Inertia\Response
    {
        $schedules = auth()->user()->schedules()->with(['intervals'])->orderBy('is_default', 'desc')->get();

        return Inertia::render('Availability/Index', [
            'schedules' => \Modules\User\Http\Resources\ScheduleResource::collection($schedules),
        ]);
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

    public function update(Schedule $schedule, AvailabilityUpdateRequest $request): \Illuminate\Http\RedirectResponse
    {
        $this->availabilityScheduleService->update($schedule, $request->validated());

        return redirect()->back();
    }

    public function delete(Schedule $schedule): \Illuminate\Http\RedirectResponse
    {
        try {
            $this->availabilityScheduleService->delete($schedule);

            return redirect()->route('availability.index');
        } catch (OnlyScheduleDeleteException $e) {
            Log::error($e->getMessage());

            return redirect()->back()->withErrors([
                'scheduleError' => __('messages.schedule.default_schedule_delete_error'),
            ]);
        }
    }
}
