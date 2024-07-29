<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class IntegrationResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->hashid,
            'name' => $this->name,
            'type' => $this->type,
            'provider' => $this->provider,
            'providerId' => $this->provider_id,
            'email' => $this->email,
            'nickname' => $this->nickname,
            'avatar' => $this->avatar,
            'settings' => $this->settings ? json_decode($this->settings) : null,
        ];
    }
}
