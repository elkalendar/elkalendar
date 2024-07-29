<?php

declare(strict_types=1);

namespace App\Listeners\Bookings;

use App\Enum\EventLocationTypes;
use App\Enum\Integrations;
use App\Events\Bookings\BookingCancelled;
use App\Services\Integrations\ZoomService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

readonly class DeleteZoomMeeting implements ShouldQueue
{
    public function __construct(private ZoomService $zoomService)
    {
    }

    public function handle(BookingCancelled $event)
    {
        if ($event->booking->location !== EventLocationTypes::ZOOM->value) {
            Log::error('Booking location is not Zoom', [
                'bookingId' => $event->booking->id,
                'eventId' => $event->booking->event->id,
            ]);

            return;
        }

        $integration = $event->booking->user->integrations()->where('provider', Integrations::PROVIDER_ZOOM)->first();

        if (! $integration) {
            Log::error('Zoom integration not found for user', [
                'bookingId' => $event->booking->id,
                'eventId' => $event->booking->event->id,
                'userId' => $event->booking->user->id,
            ]);

            return;
        }

        try {
            $this->zoomService
                ->setAccessToken($integration->getAccessToken())
                ->deleteMeeting($event->booking->settings()->get('zoomMeetingId'));
        } catch (\Exception $e) {
            Log::error('Failed to delete Zoom meeting', [
                'bookingId' => $event->booking->id,
                'eventId' => $event->booking->event->id,
                'exception' => $e->getMessage(),
            ]);
        }
    }
}
