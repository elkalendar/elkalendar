<?php

declare(strict_types=1);

namespace Modules\User\Http\Requests;

use App\Enum\Countries;
use App\Rules\OnlyUnicodeLettersWithDashes;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class Step1Request extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'username' => [
                'required',
                'string',
                'max:60',
                'min:3',
                Rule::unique('users', 'username')->ignore(auth()->user()->id),
                new OnlyUnicodeLettersWithDashes(),
            ],
            'timeFormat' => ['required', 'in:12,24'],
            'country' => ['required', 'in:'.implode(',', Countries::getCountryKeys())],
            'timezone' => 'required|timezone',
        ];
    }
}
