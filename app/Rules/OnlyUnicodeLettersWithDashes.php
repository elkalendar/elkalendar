<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class OnlyUnicodeLettersWithDashes implements Rule
{
    public const PATTERN = '/^[a-zA-Z0-9-]+$/';

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
        return 'يمكنك استخدام اللغة الانجليزية الاحرف والارقام وعلامة (-) فقط في حقل :attribute';
    }
}
