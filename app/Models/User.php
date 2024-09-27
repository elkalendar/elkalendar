<?php

declare(strict_types=1);

namespace App\Models;

use App\Enum\Defaults;
use Glorand\Model\Settings\Traits\HasSettingsField;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Mtvs\EloquentHashids\HasHashid;
use Mtvs\EloquentHashids\HashidRouting;
use Spatie\Onboard\Concerns\GetsOnboarded;
use Spatie\Onboard\Concerns\Onboardable;

/**
 * @property Event[] $events
 * @property Booking[] $bookings
 * @property Schedule[] $schedules
 */
class User extends Authenticatable implements MustVerifyEmail, Onboardable
{
    use GetsOnboarded;
    use HasFactory;
    use HasHashid;
    use HashidRouting;
    use HasSettingsField;
    use Notifiable;

    protected $table = 'users';

    public $defaultSettings = [
        'timeFormat' => '12',
        'language' => 'en',
        'country' => 'EG',
        'timezone' => 'Africa/Cairo',
        'event_display_style' => 'card',
        'default_event_language' => Defaults::LANG_EN,
        'theme' => 'system',
        'profile_name' => null,
        'public-avatar' => null,
        'profile_message' => null,
        'onboarding' => [
            'intro' => [
                'finished' => false,
                'finishedAt' => null,
            ],
            'step1' => [
                'finished' => false,
                'finishedAt' => null,
            ],
            'final' => [
                'finished' => false,
                'finishedAt' => null,
            ],
        ],
        'allowSeoIndexing' => true,
        'showDatesAsHijri' => true,
    ];

    protected $guarded = [];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function __construct()
    {
        parent::__construct();
        $this->defaultSettings['profile_message'] = __('defaults.user.profile_message');
    }

    public function events()
    {
        return $this->hasMany(Event::class);
    }

    public function eventLocations()
    {
        return $this->hasMany(EventLocation::class);
    }

    public function getBookingsCount()
    {
        return $this->bookings()->where('start_time', '>', now())
            ->whereNull('cancelled_at')
            ->whereHas('event', function ($query) {
                $query->where('deleted_at', null);
            })
            ->count();
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function getDefaultSchedule()
    {
        return $this->schedules()->where('is_default', true)->first();
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }

    public function scheduleExclusions()
    {
        return $this->hasMany(ScheduleExclusion::class);
    }


}
