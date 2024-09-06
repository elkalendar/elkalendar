<?php

declare(strict_types=1);

namespace Modules\Availability\Http\Requests;

use App\Enum\Weekdays;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AvailabilityUpdateIntervalRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'day' => ['required', 'string', Rule::in(Weekdays::ALL)],
            'from' => ['required', 'string', 'max:5'],
            'to' => ['required', 'string', 'max:5'],
        ];
    }
}
