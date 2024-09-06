<?php

declare(strict_types=1);

namespace App\Models;

use Glorand\Model\Settings\Traits\HasSettingsField;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Event\Events\EventCreated;
use Modules\Event\Events\EventDeleted;
use Modules\Event\Events\EventUpdated;
use Mtvs\EloquentHashids\HasHashid;
use Mtvs\EloquentHashids\HashidRouting;
use Spatie\Translatable\HasTranslations;

/**
 * @property $show_in_profile bool
 * @property $name string
 * @property $description string
 */
class Event extends Model
{
    use HasFactory;
    use HasHashid;
    use HashidRouting;
    use HasSettingsField;
    use HasTranslations;
    use SoftDeletes;

    protected $dispatchesEvents = [
        'created' => EventCreated::class,
        'updated' => EventUpdated::class,
        'deleted' => EventDeleted::class,
    ];

    public array $translatable = [
        'name',
        'description',
    ];

    public $defaultSettings = [
        'show_on_profile' => true,
        'max_future_booking_date' => null,
        'fields' => [
            'phone' => [
                'required' => false,
            ],
        ],
        'outgoingPhoneNumber' => null,
    ];

    protected $guarded = [];

    protected $casts = [
        'show_in_profile' => 'bool',
    ];

    protected $appends = [
        'hashid',
    ];

    public function getRouteKeyName()
    {
        return 'hashid';
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function locations()
    {
        return $this->hasMany(EventLocation::class);
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }
}
