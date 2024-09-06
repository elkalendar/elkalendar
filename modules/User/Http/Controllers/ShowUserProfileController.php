<?php

declare(strict_types=1);

namespace Modules\User\Http\Controllers;

use Inertia\Inertia;
use Modules\Booking\Repositories\BookingRepository;
use Modules\Event\Http\Resources\EventResource;
use Modules\Event\Services\EventLocationService;
use Modules\User\Repositories\UserRepository;

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
        $user = $this->userRepository->getUserByUsername($username, 'events');

        return Inertia::render('Events/Public/Index', [
            'user' => new \Modules\Common\Http\Resources\HostResource($user),
            'displayEventsAs' => $user->settings()->get('event_display_style'),
            'events' => EventResource::collection($user->events),
        ]);
    }
}
