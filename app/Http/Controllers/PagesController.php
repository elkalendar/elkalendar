<?php

declare(strict_types=1);

namespace App\Http\Controllers;

class PagesController
{
    public function home()
    {
        return view('welcome');
    }
}
