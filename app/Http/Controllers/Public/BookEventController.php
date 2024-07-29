<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Events\Bookings\BookingCreated;
use App\Http\Requests\Booking\BookRequest;
use App\Repositories\BookingRepository;
use App\Services\EventLocationService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

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
        $eventLocation = $request->event->locations->where('type', $request->get('location'))->first();
        $eventLocationValue = $this->eventLocationService->getEventLocationValueFromRequest($eventLocation, $request);

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
            ])->with('eventBooked', 'تم الحجز بنجاح.');
        } catch (\Exception $exception) {
            Log::error('Cannot create event booking.', [
                'exceptionMessage' => $exception->getMessage(),
            ]);

            return redirect()->back()->withErrors([
                'messageText' => 'لقد حدث خطأ ما اثناء عملية الحجز. يرجى التواصل مع الدعم الفني.',
            ]);
        }
    }
}
