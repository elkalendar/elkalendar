<?php

declare(strict_types=1);

namespace Modules\Common\Http\Controllers;

use Inertia\Inertia;
use Modules\Event\Http\Resources\EventResource;

class DashboardController
{
    public function __invoke()
    {
        $events = auth()->user()->events()->with(['locations', 'user'])->limit(4)->get();
        $bookings = auth()->user()
            ->bookings()
            ->with([
                'event',
            ])
            ->whereHas('event', function ($query) {
                $query->where('deleted_at', null);
            })
            ->where('start_time', '>', now())
            ->whereNull('cancelled_at')
            ->limit(5)
            ->orderBy('start_time')
            ->get();

        $bookingsToday = auth()->user()
            ->bookings()
            ->whereDay('start_time', '=', now())
            ->whereNull('cancelled_at')
            ->count();

        $bookingsNextWeek = auth()->user()
            ->bookings()
            ->whereDate('start_time', '>=', now()->addDay()->startOfDay())
            ->whereDate('start_time', '<=', now()->addDay()->startOfDay()->addWeek()->endOfDay())
            ->whereNull('cancelled_at')
            ->count();

        $bookingsNextMonth = auth()->user()
            ->bookings()
            ->whereDate('start_time', '>=', now()->addDay()->startOfDay())
            ->whereDate('start_time', '<=', now()->addDay()->startOfDay()->addMonth()->endOfDay())
            ->whereNull('cancelled_at')
            ->count();

        return Inertia::render('Dashboard', [
            'bookings' => \Modules\Booking\Http\Resources\BookingResource::collection($bookings),
            'events' => EventResource::collection($events),
            'bookingsToday' => $bookingsToday,
            'bookingsNextWeek' => $bookingsNextWeek,
            'bookingsNextMonth' => $bookingsNextMonth,
        ]);
    }
}
