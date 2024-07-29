<?php

declare(strict_types=1);

namespace App\Http\Requests\Availability;

use Illuminate\Foundation\Http\FormRequest;

class AvailabilityUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'timezone' => 'timezone',
            'isDefault' => ['required', 'boolean'],
        ];
    }
}
