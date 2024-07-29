<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Enum\Apps;

class AppsRepository
{
    public function one(string $key)
    {
        return collect(Apps::All())->where('key', $key)->first();
    }

    public function all()
    {
        return Apps::All();
    }
}
