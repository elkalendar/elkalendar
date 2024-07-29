<?php
declare(strict_types=1);
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PublicUserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'avatar' => $this->avatar,
            'username' => $this->username,
            'hasPassword' => (bool) $this->password,
            'link' => config('app.url').'/'.$this->username,
            'profileMessage' => $this->settings()->get('profile_message'),
        ];
    }
}
