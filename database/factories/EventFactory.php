<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition()
    {
        return [
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
            'duration' => 30,
        ];
    }
}
