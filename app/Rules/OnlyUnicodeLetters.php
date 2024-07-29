<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class OnlyUnicodeLetters implements Rule
{
    public const PATTERN = "/^[\p{L}0-9\s]+$/u";

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return preg_match(self::PATTERN, $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'يمكنك استخدام الاحرف والارقام فقط في حقل :attribute';
    }
}
