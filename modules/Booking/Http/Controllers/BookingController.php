<?php

declare(strict_types=1);

namespace Modules\Booking\Http\Controllers;

use App\Enum\BookingFilters;
use Inertia\Inertia;
use Modules\Booking\Repositories\BookingRepository;
use Modules\Event\Services\EventLocationService;
use Modules\User\Repositories\UserRepository;

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
            'bookings' => \Modules\Booking\Http\Resources\BookingResource::collection($bookings),
        ]);
    }
}
