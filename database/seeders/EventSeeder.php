<?php

namespace Database\Seeders;

use App\Enum\EventLocationTypes;
use App\Models\Event;
use App\Models\EventLocation;
use Faker\Generator;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class EventSeeder extends Seeder
{
    public function __construct(private readonly Generator $faker)
    {
    }

    public function run()
    {
        $adminEvent = Event::create([
            'user_id' => 1,
            'name' => [
                'ar' => 'استشارة مجانية لمدة ٣٠ دقيقة',
                'en' => 'Free 30 minutes consultation',
            ],
            'slug' => 'free-30-minutes-consultation',
            'description' => [
                'ar' => 'انضم إلي لنتحدث سوياً عن كيف يمكننا تحسين أداء عملك في الفترة المقبلة.',
                'en' => 'Join me for a free consultation session where we discuss how to improve things.',
            ],
            'color' => $this->faker->hexColor(),
            'duration' => $this->faker->numberBetween(15, 60),
        ]);

        EventLocation::insert([
            [
                'event_id' => $adminEvent->id,
                'type' => EventLocationTypes::GOOGLE_MEET,
                'settings' => '',
                'position' => 0,
            ], [
                'event_id' => $adminEvent->id,
                'type' => EventLocationTypes::ZOOM,
                'settings' => '',
                'position' => 1,
            ], [
                'event_id' => $adminEvent->id,
                'type' => EventLocationTypes::PHONE_INCOMING,
                'settings' => '',
                'position' => 2,
            ], [
                'event_id' => $adminEvent->id,
                'type' => EventLocationTypes::PHONE_OUTGOING,
                'settings' => '',
                'position' => 3,
            ], [
                'event_id' => $adminEvent->id,
                'type' => EventLocationTypes::TEXT,
                'settings' => json_encode(['text' => 'Custom text']),
                'position' => 4,
            ],
        ]);

        for ($i = 2; $i <= 11; $i++) {
            $event = Event::create([
                'user_id' => $i,
                'name' => [
                    'ar' => 'استشارة مجانية لمدة ٣٠ دقيقة',
                    'en' => 'Free 30 minutes consultation',
                ],
                'slug' => 'free-30-minutes-consultation',
                'description' => [
                    'ar' => 'انضم إلي لنتحدث سوياً عن كيف يمكننا تحسين أداء عملك في الفترة المقبلة.',
                    'en' => 'Join me for a free consultation session where we discuss how to improve things.',
                ],
                'color' => $this->faker->hexColor(),
                'duration' => $this->faker->numberBetween(15, 60),
            ]);

            for ($j = 0; $j < 3; $j++) {
                $settings = [];
                $type = Arr::random(EventLocationTypes::cases());

                if ($type === EventLocationTypes::TEXT) {
                    $settings = [
                        'text' => 'Custom text',
                    ];
                } elseif ($type === EventLocationTypes::LINK) {
                    $settings = [
                        'customLink' => $this->faker->url(),
                    ];
                } elseif ($type === EventLocationTypes::PHONE_OUTGOING) {
                    $settings = [
                        'outgoingPhone' => $this->faker->phoneNumber(),
                    ];
                }

                $event->locations()->create([
                    'type' => $type->value,
                    'settings' => json_encode($settings),
                    'position' => $j,
                ]);
            }
        }
    }
}
