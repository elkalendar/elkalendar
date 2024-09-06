<?php

declare(strict_types=1);

namespace Modules\Event\Http\Controllers;

use App\Enum\EventLocationTypes;
use App\Models\Event;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Modules\Event\Actions\CreateEventAction;
use Modules\Event\Actions\EventUpdateAction;
use Modules\Event\Http\Requests\EventCreateRequest;
use Modules\Event\Http\Requests\EventUpdateRequest;
use Modules\Event\Http\Resources\EventResource;
use Modules\User\Http\Resources\ScheduleResource;

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
            generateColorHex(),
            auth()->user()->getDefaultSchedule()->id,
        );

        return redirect()->route('events.index');
    }

    public function edit(Event $event)
    {
        $schedules = auth()->user()->schedules()->get();

        return Inertia::render('Events/Edit', [
            'event' => EventResource::make($event),
            'schedules' => ScheduleResource::collection($schedules),
            'allowedLocationTypes' => EventLocationTypes::getEnabledLocationTypes(),
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
