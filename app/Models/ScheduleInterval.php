<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use League\Period\Period;

/**
 * @property Schedule $schedule
 */
class ScheduleInterval extends Model
{
    protected $fillable = [
        'schedule_id',
        'day',
        'from',
        'to',
    ];

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }

    /**
     * @class ScheduleInterval
     */
    public function asPeriod(?int $month = null): Period
    {
        $startDate = Carbon::parse($this->from);
        $endDate = Carbon::parse($this->to);

        if ($month) {
            $startDate->setMonth($month);
            $endDate->setMonth($month);
        }

        return Period::fromDate($startDate, $endDate);
    }
}
