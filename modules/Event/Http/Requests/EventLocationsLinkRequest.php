<?php

declare(strict_types=1);

namespace Modules\Event\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventLocationsLinkRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'link' => 'required|url',
            'linkTitle' => 'string|min:3|max:52|nullable',
        ];
    }
}
