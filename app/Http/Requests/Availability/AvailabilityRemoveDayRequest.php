<?php

declare(strict_types=1);

namespace App\Http\Requests\Availability;

use App\Enum\Weekdays;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AvailabilityRemoveDayRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'day' => [
                'required',
                'string',
                Rule::in(Weekdays::ALL),
            ],
        ];
    }
}
