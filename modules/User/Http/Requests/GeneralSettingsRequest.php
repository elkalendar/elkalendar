<?php

declare(strict_types=1);

namespace Modules\User\Http\Requests;

use App\Enum\Countries;
use Illuminate\Foundation\Http\FormRequest;

class GeneralSettingsRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'language' => ['required', 'in:en,ar'],
            'timeFormat' => ['required', 'in:12,24'],
            'allowSeoIndexing' => ['required', 'boolean'],
            'country' => ['required', 'in:'.implode(',', Countries::getCountryKeys())],
        ];
    }
}
