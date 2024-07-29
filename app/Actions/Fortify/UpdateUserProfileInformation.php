<?php

namespace App\Actions\Fortify;

use App\Rules\OnlyUnicodeLetters;
use App\Rules\OnlyUnicodeLettersWithDashes;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\UpdatesUserProfileInformation;

class UpdateUserProfileInformation implements UpdatesUserProfileInformation
{
    /**
     * Validate and update the given user's profile information.
     *
     * @param  mixed  $user
     * @return void
     */
    public function update($user, array $input)
    {
        Validator::validate($input, [
            'name' => [
                'required',
                'string',
                'min:2',
                'max:255',
                new OnlyUnicodeLetters(),
            ],
            'username' => [
                'required',
                'string',
                'max:32',
                'min:3',
                Rule::unique('users', 'username')->ignore($user->id),
                new OnlyUnicodeLettersWithDashes(),
            ],
            //            'photo' => ['nullable', 'mimes:jpg,jpeg,png', 'max:1024'],
        ]);

        if (isset($input['photo'])) {
            $photo = request()->file('photo');
            $photo->storePublicly(
                'profile-photos'
            );

            if ($user->profile_photo_path) {
                Storage::delete($user->profile_photo_path);
            }

            $user->forceFill([
                'profile_photo_path' => 'profile-photos/'.$photo->hashName(),
            ])->save();
        }

        $user->forceFill([
            'name' => $input['name'],
            'username' => Str::slug($input['username']),
        ])->save();
    }
}
