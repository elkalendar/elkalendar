<?php

declare(strict_types=1);

namespace App\Services;

use ArPHP\I18N\Arabic;

readonly class HijriService
{
    public function __construct(private Arabic $arabic)
    {
    }

    public function convertToHijri(\DateTime $date): string
    {
        return $this->arabic->date('Y-m-d', $date->getTimestamp());
    }
}
