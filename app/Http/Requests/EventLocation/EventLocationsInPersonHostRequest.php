<?php

declare(strict_types=1);

namespace App\Http\Requests\EventLocation;

use Illuminate\Foundation\Http\FormRequest;

class EventLocationsInPersonHostRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'address' => 'required|string|max:150|min:3',
            'showOnBookingPage' => 'boolean',
        ];
    }
}
