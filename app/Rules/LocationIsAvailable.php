<?php

declare(strict_types=1);

namespace App\Rules;

use App\Enum\EventLocationTypes;
use App\Enum\Integrations;
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

        // Make sure the user has a Google integration
        if ($locationType->type === EventLocationTypes::GOOGLE_MEET->value) {
            $googleIntegration = $this->user->integrations()->where('provider', Integrations::PROVIDER_GOOGLE_CALENDAR)->first();

            if (! $googleIntegration) {
                return false;
            }

            return true;
        }

        // Make sure the user has a Zoom integration
        if ($locationType->type === EventLocationTypes::ZOOM->value) {
            $zoomIntegration = $this->user->integrations->where('type', Integrations::PROVIDER_ZOOM)->first();

            if (! $zoomIntegration) {
                return false;
            }

            return true;
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
