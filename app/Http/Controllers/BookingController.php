<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enum\BookingFilters;
use App\Http\Resources\BookingResource;
use App\Repositories\BookingRepository;
use App\Repositories\UserRepository;
use App\Services\EventLocationService;
use Inertia\Inertia;

class BookingController
{
    public function __construct(
        private readonly BookingRepository $bookingRepository,
        public UserRepository $userRepository,
        public EventLocationService $eventLocationService,
    ) {
    }

    public function index(): \Inertia\Response
    {
        $filterBy = request('filterBy') ?? 'incoming';
        $filterBy = BookingFilters::tryFrom($filterBy) ?? BookingFilters::incoming;

        $bookings = $this->bookingRepository->getBookingsForUser(auth()->user(), $filterBy);

        return Inertia::render('Bookings/Index', [
            'bookings' => \App\Http\Resources\BookingResource::collection($bookings),
        ]);
    }

    public function show(string $bookingId): \Inertia\Response
    {
        $booking = $this->bookingRepository->getBookingById($bookingId, auth()->user());

        return Inertia::render('Bookings/Show', [
            'booking' => new BookingResource($booking),
        ]);
    }
}
