<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Enum\BookingFilters;
use App\Enum\EventLocationTypes;
use App\Models\Booking;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class BookingRepository
{
    /**
     * @throws \Throwable
     */
    public function create(
        int $userId,
        int $eventId,
        Carbon $startTime,
        Carbon $endTime,
        string $eventLocation,
        string $eventLocationValue,
        string $timezone,
        string $inviteeName,
        string $inviteeEmail,
        array $guests,
        string $notes,
    ) {
        DB::beginTransaction();
        try {
            $booking = Booking::create([
                'user_id' => $userId,
                'event_id' => $eventId,
                'start_time' => $startTime->toDateTime(),
                'end_time' => $endTime,
                'location' => $eventLocation,
                'timezone' => $timezone,
                'invitee_name' => $inviteeName,
                'invitee_email' => $inviteeEmail,
                'guests' => $guests,
                'notes' => $notes,
            ]);

            switch ($eventLocation) {
                case EventLocationTypes::IN_PERSON_HOST->value:
                case EventLocationTypes::IN_PERSON_GUEST->value:
                    $booking->settings()->set('address', $eventLocationValue);
                    break;
                case EventLocationTypes::TEXT->value:
                    $booking->settings()->set('text', $eventLocationValue);
                    break;
                case EventLocationTypes::LINK->value:
                    $booking->settings()->set('link', $eventLocationValue);
                    break;
                default:
            }

            $booking->save();

            DB::commit();

            return $booking;
        } catch (\Exception $exception) {
            DB::rollBack();

            throw $exception;
        }
    }

    public function getBookingsFilteredByDates(array $dates): Collection
    {
        return Booking::select([
            '*',
            DB::raw('Date(start_time) as date'),
        ])
            ->whereNull('cancelled_at')
            ->whereIn(DB::raw('Date(start_time)'), $dates)
            ->get();
    }

    public function getBookingsForUser(User $user, BookingFilters $filterBy): LengthAwarePaginator
    {
        $bookings = $user->bookings()->with([
            'event',
            'user',
        ])
            ->orderBy('start_time');

        $bookings->whereHas('event', function ($query) {
            $query->where('deleted_at', null);
        });

        if ($filterBy === BookingFilters::incoming) {
            $bookings->where('start_time', '>', now())
                ->whereNull('cancelled_at');
        }

        if ($filterBy === BookingFilters::past) {
            $bookings->where('start_time', '<=', now())
                ->whereNull('cancelled_at')
                ->orderBy('start_time', 'desc');
        }

        if ($filterBy === BookingFilters::cancelled) {
            $bookings->whereNotNull('cancelled_at');
        }

        return $bookings->paginate(10);
    }

    public function getBookingById(string $bookingId, ?User $user = null)
    {
        if (!$user) {
            return Booking::where('id', $bookingId)->firstOrFail();
        }

        return $user->bookings()->where('id', $bookingId)->firstOrFail();
    }

    public function getEventBookingsByDate(int $eventId, Carbon $date, bool $asPeriod = false)
    {
        $bookings = Booking::query()->whereDate('start_time', $date)
            ->where('event_id', $eventId)
            ->whereNull('cancelled_at')
            ->get();

        if (!$asPeriod) {
            return $bookings;
        }

        return $bookings->map(function ($booking) {
            return $booking->asPeriod();
        });
    }
}
