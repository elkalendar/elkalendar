<?php

declare(strict_types=1);

namespace App\Models;

use App\Enum\EventLocationTypes;
use Carbon\Carbon;
use Glorand\Model\Settings\Traits\HasSettingsField;
use Illuminate\Database\Eloquent\Model;
use League\Period\Period;
use Mtvs\EloquentHashids\HasHashid;
use Mtvs\EloquentHashids\HashidRouting;

/**
 * @property int $id
 * @property int $user_id
 * @property int $event_id
 * @property Carbon $start_time
 * @property Carbon $end_time
 * @property string $timezone
 * @property string $notes
 * @property string $location
 * @property Carbon $cancelled_at
 * @property int $cancelled_by
 * @property string $cancel_reason
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon $deleted_at
 * @property string $invitee_name
 * @property string $invitee_email
 */
class Booking extends Model
{
    use HasHashid;
    use HashidRouting;
    use HasSettingsField;

    protected $guarded = [];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'cancelled_at' => 'datetime',
        'guests' => 'array',
    ];

    public function getRouteKeyName()
    {
        return 'hashid';
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function getBookingTimeForHostTimezone(): Carbon
    {
        return Carbon::parse($this->start_time)->setTimezone($this->getHostTimezone());
    }

    /**
     * Get the host timezone.
     */
    public function getHostTimezone(): string
    {
        return $this->event?->schedule?->timezone ?? config('app.timezone');
    }

    public function getBookingTimeForGuestTimezone(): Carbon
    {
        return Carbon::parse($this->start_time)->setTimezone($this->getGuestTimezone());
    }

    public function getGuestTimezone(): string
    {
        return $this->timezone;
    }

    public function getBookingEndTimeForHostTimezone(): Carbon
    {
        return Carbon::parse($this->end_time)->setTimezone($this->getHostTimezone());
    }

    public function getBookingEndTimeForGuestTimezone(): Carbon
    {
        return Carbon::parse($this->end_time)->setTimezone($this->getGuestTimezone());
    }

    public function asPeriod(?int $month = null): Period
    {
        $startDate = $this->start_time;
        $endDate = $this->end_time;

        if ($month) {
            $startDate->setMonth($month);
            $endDate->setMonth($month);
        }

        return Period::fromDate($startDate, $endDate);
    }

    public function getLocationDisplayValue()
    {
        return match ($this->location) {
            EventLocationTypes::TEXT->value => $this->settings()->get('text'),
            EventLocationTypes::GOOGLE_MEET->value => $this->settings()->get('googleMeetLink'),
            EventLocationTypes::ZOOM->value => $this->settings()->get('zoomMeetingLink'),
            EventLocationTypes::IN_PERSON_HOST->value => $this->settings()->get('address'),
            EventLocationTypes::IN_PERSON_GUEST->value => $this->settings()->get('address'),
            EventLocationTypes::LINK->value => $this->settings()->get('link'),
            EventLocationTypes::PHONE_INCOMING->value => $this->settings()->get('phone'),
            EventLocationTypes::PHONE_OUTGOING->value => $this->settings()->get('phone'),
            default => '',
        };
    }

    public function getMeetingLocation(): string
    {
        return match ($this->location) {
            EventLocationTypes::GOOGLE_MEET->value => $this->settings()->get('googleMeetLink') ?? $this->location,
            EventLocationTypes::PHONE_OUTGOING->value, EventLocationTypes::PHONE_INCOMING->value => $this->settings(
            )->get('phone'),
            EventLocationTypes::ZOOM->value => $this->settings()->get('zoomMeetingLink') ?? $this->location,
            EventLocationTypes::LINK->value => $this->settings()->get('link'),
            EventLocationTypes::TEXT->value => $this->settings()->get('text'),
            EventLocationTypes::IN_PERSON_GUEST->value, EventLocationTypes::IN_PERSON_HOST->value => $this->settings(
            )->get('address'),
            default => '',
        };
    }
}
