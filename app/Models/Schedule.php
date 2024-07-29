<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Collection;
use Mtvs\EloquentHashids\HasHashid;
use Mtvs\EloquentHashids\HashidRouting;

/**
 * @mixin Builder
 *
 * @property User $user
 * @property ScheduleInterval[] $intervals
 */
class Schedule extends Model
{
    use HasHashid;
    use HashidRouting;
    use SoftDeletes;

    protected $guarded = [];

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
