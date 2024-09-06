<?php

declare(strict_types=1);

namespace Modules\User\Http\Controllers;

use Inertia\Inertia;

class PersonalInformationController
{
    public function show()
    {
        return Inertia::render('Settings/PersonalInformation');
    }
}
