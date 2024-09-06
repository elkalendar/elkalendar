<?php

declare(strict_types=1);

namespace Modules\Event\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EventLocationResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->hashid,
            'type' => $this->type,
            'position' => $this->position,
            'data' => $this->settings ? json_decode($this->settings) : null,
        ];
    }
}
