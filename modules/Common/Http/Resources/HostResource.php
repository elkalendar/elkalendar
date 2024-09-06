<?php

declare(strict_types=1);

namespace Modules\Common\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class HostResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'name' => $this->settings()->get('profile_name') ?? $this->name,
            'avatar' => $this->settings()->get('profile_image') ? Storage::url($this->settings()->get('profile_image')) : null,
            'username' => $this->username,
            'link' => publicUrl($this->username),
            'profileMessage' => $this->settings()->get('profile_message'),
            'timezone' => $this->settings()->get('timezone'),
            'settings' => [
                'allowSeoIndexing' => $this->settings()->get('allowSeoIndexing'),
            ],
        ];
    }
}
