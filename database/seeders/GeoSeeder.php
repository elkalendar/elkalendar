<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enum\Countries;
use App\Enum\CountryPhoneCodes;
use App\Enum\Timezones;
use App\Models\Country;
use App\Models\CountryPhoneCode;
use App\Models\Timezone;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GeoSeeder extends Seeder
{
    /**
     * Run the seeder.
     *
     * @return void
     */
    public function run()
    {
        DB::table('locale_countries')->truncate();
        DB::table('locale_phone_codes')->truncate();
        DB::table('locale_timezone')->truncate();

        foreach (Countries::ALL as $country) {
            Country::create([
                'code' => $country['code'],
                'name' => $country['name'],
            ]);
        }

        foreach (Timezones::ALL as $timezone) {
            Timezone::create([
                'value' => $timezone['value'],
                'offset' => $timezone['offset'],
                'offset_name' => $timezone['offsetName'],
                'label' => $timezone['label'],
            ]);
        }

        foreach (CountryPhoneCodes::ALL as $phoneCode) {
            CountryPhoneCode::create([
                'country_code' => $phoneCode['countryCode'],
                'country_name' => $phoneCode['countryName'],
                'phone_code' => $phoneCode['phoneNumberCode'],
            ]);
        }
    }
}
