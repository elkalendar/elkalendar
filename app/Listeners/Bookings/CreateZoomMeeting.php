<?php

declare(strict_types=1);

namespace App\Listeners\Bookings;

use App\Enum\EventLocationTypes;
use App\Enum\Integrations;
use App\Events\Bookings\BookingCreated;
use App\Services\Integrations\ZoomService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

readonly class CreateZoomMeeting
{
    public function __construct(private ZoomService $zoomService)
    {
    }

    public function handle(BookingCreated $event)
    {
        if ($event->booking->location !== EventLocationTypes::ZOOM->value) {
            Log::error('Booking location is not Zoom', [
                'bookingId' => $event->booking->id,
                'location' => $event->booking->location,
            ]);

            return;
        }

        $integration = $event->booking->user->integrations()->where('provider', Integrations::PROVIDER_ZOOM)->first();

        if (!$integration) {
            Log::error('Zoom integration not found for user (No Zoom integration)', [
                'userId' => $event->booking->user->id,
                'bookingId' => $event->booking->id,
                'location' => $event->booking->location,
            ]);

            return;
        }

        $startTime = Carbon::parse($event->booking->start_time);

        try {
            $zoomMeeting = $this->zoomService
                ->setAccessToken($integration->getAccessToken())
                ->createMeeting(
                    $event->booking->event->name . ' مع ' . $event->booking->invitee_name,
                    $startTime,
                    $event->booking->timezone,
                    $event->booking->event->duration,
                );

            $event->booking->settings()->setMultiple([
                'zoomMeetingLink' => $zoomMeeting['join_url'],
                'zoomMeetingId' => $zoomMeeting['id'],
                'zoomMeetingUuid' => $zoomMeeting['uuid'],
                'payload' => json_encode($zoomMeeting),
            ]);
        } catch (\Exception $exception) {
            Log::error('Zoom integration not found for user', [
                'bookingId' => $event->booking->id,
                'exception' => $exception->getMessage(),
            ]);

            return;
        }
    }
}
