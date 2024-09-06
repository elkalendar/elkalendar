<?php

declare(strict_types=1);

namespace Modules\User\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Modules\Booking\Events\BookingCreated;
use Modules\Booking\Http\Requests\BookRequest;
use Modules\Booking\Repositories\BookingRepository;
use Modules\Event\Services\EventLocationService;

readonly class BookEventController
{
    public function __construct(
        private BookingRepository $bookingRepository,
        private EventLocationService $eventLocationService,
    ) {
    }

    public function __invoke(string $username, string $slug, BookRequest $request)
    {
        $startTime = Carbon::parse($request->get('slot'));
        $eventLocationValue = null;

        if ($request->get('location')) {
            $eventLocation = $request->event->locations->where('type', $request->get('location'))->first();
            $eventLocationValue = $this->eventLocationService->getEventLocationValueFromRequest($eventLocation, $request);
        }

        try {
            $booking = $this->bookingRepository->create(
                $request->user->id,
                $request->event->id,
                $startTime,
                $startTime->copy()->addMinutes($request->event->duration),
                $request->get('location'),
                $eventLocationValue,
                $request->get('timezone'),
                $request->get('name'),
                $request->get('email'),
                $request->get('guests') ?? [],
                $request->get('notes') ?? '',
            );

            event(new BookingCreated($booking));

            return to_route('booking.show-booking', [
                'booking' => $booking,
            ])->with('eventBooked', __('messages.event.booked_successfully'));
        } catch (\Exception $exception) {
            Log::error('Cannot create event booking.', [
                'exceptionMessage' => $exception->getMessage(),
            ]);

            return redirect()->back()->withErrors([
                'messageText' => __('messages.event.booking_error'),
            ]);
        }
    }
}
