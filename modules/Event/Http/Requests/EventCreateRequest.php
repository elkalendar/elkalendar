<?php

declare(strict_types=1);

namespace Modules\Event\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class EventCreateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'duration' => 'integer|min:15|max:120',
            'slug' => [
                'max:255',
                Rule::unique('events')->where(fn ($query) => $query->where('user_id', auth()->user()->id))
                    ->where(fn ($query) => $query->where('slug', Str::slug(request('slug'))))
                    ->where(fn ($query) => $query->where('deleted_at', null)),
            ],
        ];
    }

    /**
     * @throws ValidationException
     */
    protected function passedValidation(): void
    {
        $defaultSchedule = auth()->user()->getDefaultSchedule();

        if (!$defaultSchedule) {
            throw ValidationException::withMessages(['schedule' => __('validation.no_default_schedule')]);
        }
    }
}
