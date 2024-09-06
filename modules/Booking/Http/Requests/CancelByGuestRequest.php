<?php

declare(strict_types=1);

namespace Modules\Booking\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CancelByGuestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'cancel_reason' => ['required', 'string', 'max:255'],
        ];
    }
}
