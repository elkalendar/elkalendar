<?php

declare(strict_types=1);

namespace Modules\Booking\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Validator;

class Emails implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $rules = [
            'email' => 'email',
        ];

        foreach ($value as $email) {
            $data = [
                'email' => $email,
            ];

            $validator = Validator::make($data, $rules);

            if ($validator->fails()) {
                $fail('validation.emails')->translate();
            }
        }
    }
}
