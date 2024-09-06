<?php

declare(strict_types=1);

namespace Modules\Common\Http\Controllers;

class PagesController
{
    public function home()
    {
        return view('welcome');
    }
}
