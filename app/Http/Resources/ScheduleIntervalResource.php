<?php
declare(strict_types=1);
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleIntervalResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'day' => $this->day,
            'from' => $this->from,
            'to' => $this->to,
        ];
    }
}
