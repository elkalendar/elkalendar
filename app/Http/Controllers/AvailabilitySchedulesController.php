<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enum\Timezones;
use App\Exceptions\OnlyScheduleDeleteException;
use App\Http\Requests\Availability\AvailabilityUpdateRequest;
use App\Models\Schedule;
use App\Services\AvailabilitySchedule\AvailabilityScheduleService;
use Inertia\Inertia;

readonly class AvailabilitySchedulesController
{
    public function __construct(private AvailabilityScheduleService $availabilityScheduleService)
    {
    }

    public function index(): \Inertia\Response
    {
        $schedules = auth()->user()->schedules()->with(['intervals'])->orderBy('is_default', 'desc')->get();

        return Inertia::render('Availability/Index', [
            'schedules' => \App\Http\Resources\ScheduleResource::collection($schedules),
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
            'schedule' => \App\Http\Resources\ScheduleResource::make($schedule),
            'timezones' => $timezones,
        ]);
    }

    public function delete(Schedule $schedule): \Illuminate\Http\RedirectResponse
    {
        try {
            $this->availabilityScheduleService->delete($schedule);

            return redirect()->route('availability.index');
        } catch (OnlyScheduleDeleteException $e) {
            return redirect()->back()->withErrors([
                'scheduleError' => 'لا يمكن حذف الموعد الافتراضي',
            ]);
        }
    }

    public function update(Schedule $schedule, AvailabilityUpdateRequest $request): \Illuminate\Http\RedirectResponse
    {
        $this->availabilityScheduleService->update($schedule, $request->validated());

        return redirect()->back();
    }
}
