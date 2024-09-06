<?php

declare(strict_types=1);

namespace Modules\Booking\Http\Controllers;

use App\Models\Booking;
use Modules\Booking\Services\ICalendarService;

class DownloadBookingIcsController
{
    public function __construct(
        private readonly ICalendarService $ICalendarService,
    ) {
    }

    public function __invoke(Booking $booking)
    {
        $ics = $this->ICalendarService->generate($booking);

        $tempFileName = sys_get_temp_dir().'/'.$booking->id;

        file_put_contents($tempFileName, $ics);

        $downloadFileName = 'elkalendar-invite-'.now()->toIso8601String().'.ics';

        return response()->download($tempFileName, $downloadFileName);
    }
}
