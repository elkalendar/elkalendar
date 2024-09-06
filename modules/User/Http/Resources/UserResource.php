<?php

declare(strict_types=1);

namespace Modules\User\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->hashid,
            'name' => $this->name,
            'email' => $this->email,
            'avatar' => $this->avatar,
            'username' => $this->username,
            'hasPassword' => (bool) $this->password,
            'link' => publicUrl($this->username),
            'profileMessage' => $this->settings()->get('profile_message'),
            'profileImage' => $this->settings()->get('profile_image') ? Storage::url($this->settings()->get('profile_image')) : null,
            'profileName' => $this->settings()->get('profile_name') ?? $this->name,
            'createdAt' => $this->created_at,
            'isVerified' => (bool) $this->email_verified_at,
            'timezone' => $this->settings()->get('timezone'),
            'country' => $this->settings()->get('country'),
            'timeFormat' => $this->settings()->get('timeFormat'),
            'theme' => $this->settings()->get('theme'),
            'allowSeoIndexing' => $this->settings()->get('allowSeoIndexing'),
            'settings' => $this->settings ? json_decode($this->settings) : null,
            'notificationsCount' => $this->notifications()->count(),
            'language' => $this->settings()->get('language'),
        ];
    }
}
