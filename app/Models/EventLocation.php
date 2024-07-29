<?php

declare(strict_types=1);

namespace App\Models;

use Glorand\Model\Settings\Traits\HasSettingsField;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Mtvs\EloquentHashids\HasHashid;

class EventLocation extends Model
{
    use HasFactory;
    use HasHashid;
    use HasSettingsField;

    protected $guarded = [];

    protected $casts = [
        'settings' => 'json',
    ];

    protected $appends = [
        'hashid',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
