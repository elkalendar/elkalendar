<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use LucasDotVin\Soulbscription\Enums\PeriodicityType;
use LucasDotVin\Soulbscription\Models\Feature;
use LucasDotVin\Soulbscription\Models\Plan;

class PlanSeeder extends Seeder
{
    public function run()
    {
        $free = Plan::create([
            'name' => 'free',
            'periodicity_type' => null,
            'periodicity' => null,
        ]);

        $pro = Plan::create([
            'name' => 'pro',
            'periodicity_type' => PeriodicityType::Month,
            'periodicity' => 1,
            'grace_days' => 7,
        ]);

        $proYearly = Plan::create([
            'name' => 'pro-yearly',
            'periodicity_type' => PeriodicityType::Year,
            'periodicity' => 1,
            'grace_days' => 14,
        ]);

        $eventCount = Feature::whereName('event-count')->first();
        $bookingCount = Feature::whereName('booking-count')->first();
        $integrationCount = Feature::whereName('integration-count')->first();
        $paymentIntegration = Feature::whereName('payment-integration')->first();

        $free->features()->attach($eventCount, [
            'charges' => 1,
        ]);
        $free->features()->attach($bookingCount, [
            'charges' => 30,
        ]);
        $free->features()->attach($integrationCount, [
            'charges' => 1,
        ]);

        $pro->features()->attach($eventCount, [
            'charges' => 0,
        ]);
        $pro->features()->attach($bookingCount, [
            'charges' => 0,
        ]);
        $pro->features()->attach($integrationCount, [
            'charges' => 0,
        ]);
        $pro->features()->attach($paymentIntegration);

        $proYearly->features()->attach($eventCount, [
            'charges' => 0,
        ]);
        $proYearly->features()->attach($bookingCount, [
            'charges' => 0,
        ]);
        $proYearly->features()->attach($integrationCount, [
            'charges' => 0,
        ]);
        $proYearly->features()->attach($paymentIntegration);
    }
}
