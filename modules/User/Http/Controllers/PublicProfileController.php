<?php

declare(strict_types=1);

namespace Modules\User\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Storage;

class PublicProfileController
{
    public function destroyPublicAvatar()
    {
        /** @var User $user */
        $user = auth()->user();

        Storage::delete($user->settings()->get('public-avatar'));
        $user->settings()->delete('public-avatar');
    }
}
