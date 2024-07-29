<?php
declare(strict_types=1);
namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\CalendarLinks\Link;

class BookingResource extends JsonResource
{
    public function toArray($request): array
    {
        $event = $this->event;

        $startTimeHost = $this->getBookingTimeForHostTimezone();
        $endTimeHost = $this->getBookingEndTimeForHostTimezone();

        $startTimeGuest = $this->getBookingTimeForGuestTimezone();
        $endTimeGuest = $this->getBookingEndTimeForGuestTimezone();

        $googleLinkHost = Link::create(
            $event->name,
            $startTimeHost,
            $endTimeHost
        )->description($event->description)
            ->address($this->getLocationDisplayValue() ?? '')
            ->google();

        $outlookLinkHost = Link::create(
            $event->name,
            $startTimeHost,
            $endTimeHost
        )->description($event->description)
            ->address($this->getLocationDisplayValue() ?? '')
            ->webOutlook();

        $officeLinkHost = Link::create(
            $event->name,
            $startTimeHost,
            $endTimeHost
        )->description($event->description)
            ->address($this->getLocationDisplayValue() ?? '')
            ->webOffice();

        $googleLink = Link::create($event->name, $startTimeGuest, $endTimeGuest)
            ->description($event->description)
            ->address($this->getLocationDisplayValue() ?? '')
            ->google();

        $outlookLink = Link::create($event->name, $startTimeGuest, $endTimeGuest)
            ->description($event->description)
            ->address($this->getLocationDisplayValue() ?? '')
            ->webOutlook();

        $officeLink = Link::create($event->name, $startTimeGuest, $endTimeGuest)
            ->description($event->description)
            ->address($this->getLocationDisplayValue() ?? '')
            ->webOffice();

        return [
            'id' => $this->hashid,
            'createdAt' => $this->created_at->toIso8601String(),
            'isCancelled' => (bool) $this->cancelled_at,
            'cancelledAt' => $this->cancelled_at ? Carbon::parse($this->cancelled_at)->toIso8601String() : null,
            'cancelReason' => $this->cancel_reason,
            'isPastHost' => $startTimeHost->isPast(),
            'isPastGuest' => $startTimeGuest->isPast(),
            'startTimeHost' => $startTimeHost->toIso8601String(),
            'endTimeHost' => $endTimeHost->toIso8601String(),
            'startTimeGuest' => $startTimeGuest->toIso8601String(),
            'endTimeGuest' => $endTimeGuest->toIso8601String(),
            'event' => EventResource::make($this->event),
            'invitee' => [
                'name' => $this->invitee_name,
                'email' => $this->invitee_email,
            ],
            'guestsCount' => $this->guests ? count($this->guests) : 0,
            'timezone' => $this->timezone,
            'location' => $this->location,
            'locationData' => $this->location ? json_decode($this->settings) : null,
            'notes' => $this->notes,
            'addToCalendarLinksHost' => [
                'google' => $googleLinkHost,
                'outlook' => $outlookLinkHost,
                'office' => $officeLinkHost,
            ],
            'addToCalendarLinksGuest' => [
                'google' => $googleLink,
                'outlook' => $outlookLink,
                'office' => $officeLink,
            ],
        ];
    }
}
