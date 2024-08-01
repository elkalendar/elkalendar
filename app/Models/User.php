<?php

declare(strict_types=1);

namespace App\Models;

use App\Enum\Defaults;
use Glorand\Model\Settings\Traits\HasSettingsField;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Response;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Mtvs\EloquentHashids\HasHashid;
use Mtvs\EloquentHashids\HashidRouting;
use Spatie\Onboard\Concerns\GetsOnboarded;
use Spatie\Onboard\Concerns\Onboardable;

/**
 * @property Event[] $events
 * @property Booking[] $bookings
 * @property Schedule[] $schedules
 * @property Integration[] $integrations
 */
class User extends Authenticatable implements Onboardable, MustVerifyEmail
{
    use GetsOnboarded;
    use HasFactory;
    use HasSettingsField;
    use HasHashid;
    use HashidRouting;
    use Notifiable;

    protected $dispatchesEvents = [
        'created' => Registered::class,
    ];

    public $defaultSettings = [
        'timeFormat' => '12',
        'language' => 'ar',
        'country' => 'EG',
        'timezone' => 'Africa/Cairo',
        'event_display_style' => 'card',
        'default_event_language' => Defaults::LANG_EN,
        'theme' => 'system',
        'profile_message' => 'مرحبا بكم في صفحة الجدولة الخاصة بي.',
        'profile_name' => null,
        'profile_image' => null,
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

    public function events()
    {
        return $this->hasMany(Event::class);
    }

    public function eventLocations()
    {
        return $this->hasMany(EventLocation::class);
    }

    public function integrations()
    {
        return $this->hasMany(Integration::class);
    }

    public function cancelledBookings()
    {
        return $this->hasMany(Booking::class, 'cancelled_by', 'id');
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

    public function logoutFromOAuth()
    {
        $accessToken = session()->get('access_token');

        if (!$accessToken) {
            Log::error('Cannot logout from YottaHQ oAuth server. Access token is missing.');
            return;
        }

        $logoutResponse = Http::withToken($accessToken)
            ->acceptJson()
            ->get(config('services.yottahq.accounts_domain') . '/api/logout');

        if ($logoutResponse->status() !== Response::HTTP_OK) {
            Log::error('Failed to logout from YottaHQ oAuth server', [
                'response' => $logoutResponse->json(),
            ]);

            return redirect()->route('dashboard')->with('error', 'Failed to logout from YottaHQ oAuth server');
        }
    }
}
