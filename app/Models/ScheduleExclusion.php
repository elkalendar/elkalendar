<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Mtvs\EloquentHashids\HasHashid;
use Mtvs\EloquentHashids\HashidRouting;

class ScheduleExclusion extends Model
{
    use HasFactory;
    use HasHashid;
    use HashidRouting;

    protected $fillable = [
        'user_id',
        'date',
        'from',
        'to',
        'reason',
    ];

    protected $casts = [
        'date' => 'datetime',
    ];

    public function getRouteKeyName()
    {
        return 'hashid';
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }
}
