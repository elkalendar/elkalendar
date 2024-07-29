<?php

declare(strict_types=1);

namespace App\Http\Controllers\Events;

use App\Actions\Events\CreateEventAction;
use App\Actions\Events\EventUpdateAction;
use App\Enum\EventLocationTypes;
use App\Http\Requests\Event\EventCreateRequest;
use App\Http\Requests\Event\EventUpdateRequest;
use App\Http\Resources\EventResource;
use App\Http\Resources\IntegrationResource;
use App\Http\Resources\ScheduleResource;
use App\Models\Event;
use App\Services\ColorService;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class EventsController
{
    public function index(): \Inertia\Response
    {
        $events = auth()->user()->events;

        return Inertia::render('Events/Index', [
            'events' => EventResource::collection($events),
        ]);
    }

    public function store(EventCreateRequest $request, CreateEventAction $action): \Illuminate\Http\RedirectResponse
    {
        $action->execute(
            $request->get('slug'),
            $request->get('name'),
            auth()->user()->id,
            $request->get('duration'),
            ColorService::generateHex(),
            auth()->user()->getDefaultSchedule()->id,
        );

        return redirect()->route('events.index');
    }

    public function edit(Event $event)
    {
        $schedules = auth()->user()->schedules()->get();
        $integrations = auth()->user()->integrations()->get();

        return Inertia::render('Events/Edit', [
            'event' => EventResource::make($event),
            'schedules' => ScheduleResource::collection($schedules),
            'allowedLocationTypes' => EventLocationTypes::getEnabledLocationTypes(),
            'integrations' => IntegrationResource::collection($integrations),
        ]);
    }

    public function update(Event $event, EventUpdateRequest $request, EventUpdateAction $action): void
    {
        $action->execute(
            $event,
            $request->get('slug'),
            $request->get('name'),
            $request->get('description'),
            $request->get('duration'),
            $request->get('color'),
            $request->get('visible')
        );
    }

    public function destroy(Event $event): \Illuminate\Http\RedirectResponse
    {
        $event->delete();

        return Redirect::route('events.index');
    }
}
