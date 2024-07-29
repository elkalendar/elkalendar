<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserPublicResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->hashid,
            'name' => $this->name,
            'avatar' => $this->avatar,
            'username' => $this->username,
            'link' => publicUrl($this->username),
            'profileMessage' => $this->settings()->get('profile_message'),
            'settings' => [
                'allowSeoIndexing' => $this->settings()->get('allowSeoIndexing'),
            ],
        ];
    }
}
