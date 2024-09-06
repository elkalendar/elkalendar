<?php

declare(strict_types=1);

namespace Modules\User\Http\Resources;

use App\Enum\Weekdays;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{
    public function toArray($request)
    {
        $intervals = [];

        foreach (Weekdays::ALL as $weekday) {
            $intervals[$weekday] = [];

            if ($this->intervals->firstWhere('day', $weekday)) {
                $interval = $this->intervals->firstWhere('day', $weekday);
                $intervals[$weekday][] = [
                    'from' => $interval->from,
                    'to' => $interval->to,
                ];
            }
        }

        return [
            'id' => $this->hashid,
            'name' => $this->name,
            'isDefault' => (bool) $this->is_default,
            'timezone' => $this->timezone,
            'intervals' => $intervals,
        ];
    }
}
