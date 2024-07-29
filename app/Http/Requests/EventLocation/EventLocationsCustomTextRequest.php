<?php

declare(strict_types=1);

namespace App\Http\Requests\EventLocation;

use Illuminate\Foundation\Http\FormRequest;

class EventLocationsCustomTextRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'text' => 'required|string|max:90|min:3',
        ];
    }
}
