<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Resources\EventResource;
use App\Repositories\BookingRepository;
use App\Repositories\UserRepository;
use App\Services\EventLocationService;
use Inertia\Inertia;

class ShowUserProfileController
{
    public function __construct(
        public UserRepository $userRepository,
        public BookingRepository $bookingRepository,
        public EventLocationService $eventLocationService,
    ) {
    }

    public function __invoke(string $username)
    {
        $user = $this->userRepository->getUserByUsername($username, ['events']);

        return Inertia::render('Events/Public/Index', [
            'user' => new \App\Http\Resources\HostResource($user),
            'displayEventsAs' => $user->settings()->get('event_display_style'),
            'events' => EventResource::collection($user->events),
        ]);
    }
}
