<?php

namespace App\Http\Controllers;

class PagesController
{
    public function home()
    {
        return view('welcome');
    }
}
