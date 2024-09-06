<?php

declare(strict_types=1);

namespace Modules\User\Actions;

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class SavePublicPageAction
{
    public function execute(
        UploadedFile|null $photo,
        string $name,
        string $message,
        string $username,
    ): void {
        /** @var User $user */
        $user = auth()->user();

        if ($photo) {
            $photo->storePublicly('profile-photos');

            if ($user->avatar) {
                Storage::delete($user->avatar);
            }

            $user->avatar = 'profile-photos/' . $photo->hashName();
        }

        $user->settings()->setMultiple([
            'profile_name' => $name,
            'profile_message' => strip_tags($message),
        ]);

        $user->forceFill([
            'username' => $username,
        ])->save();
    }
}
