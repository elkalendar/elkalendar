<?php

namespace App\Console\Commands;

use App\Enum\Countries;
use Illuminate\Console\Command;

class ProcessCountries extends Command
{
    protected $signature = 'countries:process';

    public function handle()
    {
        $this->info('Processing countries...');

        $arr = [];
        foreach (Countries::GOOGLE_COUNTRIES as $country) {
            $arr[] = [
                'code' => trim($country['key']),
                'name_ar' => trim($country['name_ar']),
                'name_native' => isset($country['name_native']) ? trim($country['name_native']) : trim($country['name_ar']),
            ];
        }
    }
}
