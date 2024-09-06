<?php

declare(strict_types=1);

namespace Modules\Event\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventUpdateScheduleRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'scheduleId' => [
                'required',
                'string',
            ],
        ];
    }
}
