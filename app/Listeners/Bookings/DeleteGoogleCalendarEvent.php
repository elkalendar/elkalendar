<?php

declare(strict_types=1);

namespace App\Listeners\Bookings;

use App\Enum\EventLocationTypes;
use App\Enum\Integrations;
use App\Events\Bookings\BookingCancelled;
use App\Services\Integrations\GoogleCalendarService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

readonly class DeleteGoogleCalendarEvent implements ShouldQueue
{
    public function __construct(private GoogleCalendarService $googleCalendarService)
    {
    }

    public function handle(BookingCancelled $event)
    {
        if ($event->booking->location !== EventLocationTypes::GOOGLE_MEET->value) {
            return;
        }

        $integration = $event->booking->user->integrations()->where(
            'provider',
            Integrations::PROVIDER_GOOGLE_CALENDAR
        )->first();

        if (!$integration) {
            return;
        }

        try {
            $this->googleCalendarService
                ->setAccessToken($integration->getAccessToken())
                ->deleteEvent($event->booking->settings()->get('googleCalendarEventId'));
        } catch (\Exception $e) {
            Log::error('Failed to delete Google Calendar event', [
                'bookingId' => $event->booking->id,
                'googleCalendarEventId' => $event->booking->settings()->get('googleCalendarEventId'),
                'exception' => $e->getMessage(),
            ]);
        }
    }
}
