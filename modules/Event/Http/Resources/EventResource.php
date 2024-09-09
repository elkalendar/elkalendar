<?php

declare(strict_types=1);

namespace Modules\Event\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Modules\User\Http\Resources\ScheduleResource;

class EventResource extends JsonResource
{
    public function toArray($request): array
    {
        $eventSchedule = $this->schedule;

        return [
            'id' => $this->hashid,
            'userId' => $this->user->hashid,
            'scheduleId' => $this->schedule->hashid,
            'schedule' => ScheduleResource::make($eventSchedule),
            'name' => $this->name,
            'description' => $this->description,
            'locations' => EventLocationResource::collection($this->locations),
            'slug' => $this->slug,
            'duration' => $this->duration,
            'visible' => $this->show_in_profile,
            'color' => $this->color,
            'link' => publicUrl($this->user->username.'/'.$this->slug),
            'fields' => $this->settings()->get('fields'),
            'maxFutureBookingDate' => $this->settings()->get('max_future_booking_date') ?
                Carbon::parse($this->settings()->get('max_future_booking_date')) :
                null,
            'createdAt' => $this->created_at,
        ];
    }
}
