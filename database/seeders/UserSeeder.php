<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Mohamed Hassan',
            'username' => 'm074554n',
            'email' => 'mo@yottahq.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'company_role' => 'CEO',
        ]);

        User::factory(10)->create();
    }
}
