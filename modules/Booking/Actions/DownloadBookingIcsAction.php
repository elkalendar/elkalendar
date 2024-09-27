<?php

declare(strict_types=1);

namespace Modules\Booking\Actions;

use App\Models\Booking;
use Modules\Booking\Services\ICalendarService;

readonly class DownloadBookingIcsAction
{
    public function __construct(
        private ICalendarService $ICalendarService,
    ) {
    }

    public static function getDownloadName(): string
    {
        return 'elkalendar-invite-'.now()->toIso8601String().'.ics';
    }

    public function execute(Booking $booking): string
    {
        $ics = $this->ICalendarService->generate($booking);

        $tempFileName = sys_get_temp_dir().'/'.$booking->id;

        file_put_contents($tempFileName, $ics);

        return $tempFileName;
    }
}
