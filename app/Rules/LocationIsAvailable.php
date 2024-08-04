<?php

declare(strict_types=1);

namespace App\Rules;

use App\Models\Event;
use App\Models\User;
use Illuminate\Contracts\Validation\Rule;

class LocationIsAvailable implements Rule
{
    public function __construct(private readonly User $user, private readonly Event $event)
    {
    }

    public function passes($attribute, $value)
    {
        // Make sure the event has the location type
        $locationType = $this->event->locations()->where('type', $value)->first();

        if (! $locationType) {
            return false;
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return ':attribute غير متاح';
    }
}
