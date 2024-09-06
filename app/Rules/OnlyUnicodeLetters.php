<?php

declare(strict_types=1);

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class OnlyUnicodeLetters implements ValidationRule
{
    public const PATTERN = "/^[\p{L}0-9\s]+$/u";

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!preg_match(self::PATTERN, $value)) {
            $fail('validation.unicode_only')->translate();
        }
    }
}
