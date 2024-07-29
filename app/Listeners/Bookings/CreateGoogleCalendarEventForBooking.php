<?php

declare(strict_types=1);

namespace App\Listeners\Bookings;

use App\Entities\Attendee;
use App\Enum\EventLocationTypes;
use App\Enum\Integrations;
use App\Events\Bookings\BookingCreated;
use App\Services\Integrations\GoogleCalendarService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

readonly class CreateGoogleCalendarEventForBooking
{
    public function __construct(private GoogleCalendarService $googleCalendarService)
    {
    }

    public function handle(BookingCreated $event)
    {
        if ($event->booking->location !== EventLocationTypes::GOOGLE_MEET->value) {
            return;
        }

        $integration = $event->booking->user->integrations()->where(
            'provider',
            Integrations::PROVIDER_GOOGLE_CALENDAR
        )->first();

        if (!$integration) {
            Log::error('Google integration not found for user', [
                'userId' => $event->booking->user->id,
            ]);

            return;
        }

        $attendees = [
            new Attendee($event->booking->invitee_email, $event->booking->invitee_name),
        ];

        foreach ($event->booking->guests as $guest) {
            $attendees[] = new Attendee($guest->email, $guest->name);
        }

        $startTime = Carbon::parse($event->booking->start_time);
        $endTime = Carbon::parse($event->booking->end_time);

        try {
            $googleCalendarEvent = $this->googleCalendarService
                ->setAccessToken($integration->getAccessToken())
                ->createEvent(
                    $startTime,
                    $endTime,
                    $event->booking->timezone,
                    $event->booking->event->name,
                    $attendees,
                    'primary',
                );

            $event->booking->settings()->setMultiple([
                'googleMeetLink' => $googleCalendarEvent->getHangoutLink(),
                'googleCalendarEventId' => $googleCalendarEvent->getId(),
            ]);
        } catch (\Exception $exception) {
            Log::error('Failed to create Google Calendar event', [
                'bookingId' => $event->booking->id,
                'exception' => $exception->getMessage(),
            ]);

            return;
        }
    }
}
