<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Mtvs\EloquentHashids\HasHashid;
use Mtvs\EloquentHashids\HashidRouting;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 *
 * @property-read int $id
 * @property int $user_id
 * @property string $name
 * @property string $timezone
 * @property bool $is_default
 *
 * @property-read Carbon $created_at
 * @property-read Carbon $updated_at
 * @property-read Carbon $deleted_at
 *
 * @property-read User $user
 * @property-read Event[] $events
 * @property-read  ScheduleInterval[] $intervals
 * @property-read ScheduleExclusion[] $exclusions
 */
class Schedule extends Model
{
    use HasHashid;
    use HashidRouting;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'timezone',
        'is_default',
    ];

    protected $appends = [
        'hashid',
    ];

    protected $casts = [
        'is_default' => 'bool',
    ];

    public function getRouteKeyName()
    {
        return 'hashid';
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function intervals()
    {
        return $this->hasMany(ScheduleInterval::class)
            ->orderBy('day')
            ->orderBy('from');
    }

    public function events()
    {
        return $this->hasMany(Event::class);
    }

    public function exclusions()
    {
        return $this->hasMany(ScheduleExclusion::class);
    }

    public function getScheduleDayNames(): Collection
    {
        return $this->intervals->pluck('day')->unique();
    }

    /**
     * Get user defined intervals as Periods grouped by day name
     */
    public function getDayPeriods(): array
    {
        $availabilityByDay = [];

        foreach ($this->intervals as $userDefinedInterval) {
            $dayName = $userDefinedInterval->day;
            $availabilityByDay[$dayName][] = $userDefinedInterval->asPeriod();
        }

        return $availabilityByDay;
    }
}
