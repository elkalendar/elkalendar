<?php

declare(strict_types=1);

namespace App\Http\Requests\Settings;

use App\Rules\OnlyUnicodeLetters;
use App\Rules\OnlyUnicodeLettersWithDashes;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PublicPageSettingsRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $user = auth()->user();

        return [
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
                'max:60',
                'min:3',
                Rule::unique('users', 'username')->ignore($user->id),
                new OnlyUnicodeLettersWithDashes(),
            ],
            'photo' => ['nullable', 'mimes:jpg,jpeg,png', 'max:1024'],
            'profileMessage' => ['required', 'string', 'max:250'],
        ];
    }
}
