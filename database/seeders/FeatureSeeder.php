<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use LucasDotVin\Soulbscription\Enums\PeriodicityType;
use LucasDotVin\Soulbscription\Models\Feature;

class FeatureSeeder extends Seeder
{
    public function run()
    {
        $eventCount = Feature::create([
            'consumable' => true,
            'name' => 'event-count',
        ]);

        $bookingCount = Feature::create([
            'consumable' => true,
            'name' => 'booking-count',
            'periodicity_type' => PeriodicityType::Month,
            'periodicity' => 1,
        ]);

        $integrationCount = Feature::create([
            'consumable' => true,
            'name' => 'integration-count',
        ]);

        $paymentIntegration = Feature::create([
            'consumable' => false,
            'name' => 'payment-integration',
        ]);

        $apiAccess = Feature::create([
            'consumable' => false,
            'name' => 'api-access',
        ]);
    }
}
