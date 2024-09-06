<?php

declare(strict_types=1);

namespace Modules\Event\Http\Requests;

use App\Models\Event;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class EventUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return $this->route('event')->user_id === auth()->user()->getAuthIdentifier();
    }

    public function rules()
    {
        /** @var Event $event */
        $event = $this->route('event');

        return [
            'name' => 'required|string|max:255',
            'slug' => [
                'max:255',
                Rule::unique('events')->where(fn ($query) => $query->where('user_id', auth()->user()->id))->ignore(
                    $event->id
                )
                    ->where(fn ($query) => $query->where('slug', Str::slug(request('slug'))))
                    ->where(fn ($query) => $query->where('deleted_at', null))
                    ->ignore($event->id),
            ],
            'description' => 'max:500',
            'duration' => 'integer|min:5|max:120',
            'color' => ['regex:/^(\#[\da-f]{3}|\#[\da-f]{6})$/i'],
            'visible' => 'required|boolean',
        ];
    }
}
