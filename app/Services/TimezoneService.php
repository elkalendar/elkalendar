<?php

declare(strict_types=1);

namespace App\Services;

use App\Enum\Timezones;

class TimezoneService
{
    public function getDateTimeZoneIdentifiers(): array
    {
        return \DateTimeZone::listIdentifiers();
    }

    public function getTimezones(): array
    {
        return collect(Timezones::ALL)->map(function ($item) {
            return [
                'value' => $item['value'],
                'label' => $item['label_ar'],
            ];
        })->toArray();
    }
}
