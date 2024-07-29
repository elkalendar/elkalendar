<?php

namespace App\Http\Controllers;

use App\Models\Changelog;

class ChangelogController
{
    public function all()
    {
        $entries = Changelog::orderby('created_at', 'desc')->get();

        return view('changelog', [
            'entries' => $entries,
        ]);
    }
}
