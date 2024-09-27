<?php

declare(strict_types=1);

namespace Modules\Booking\Http\Controllers;

use App\Models\Booking;
use Modules\Booking\Actions\DownloadBookingIcsAction;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class DownloadBookingIcsController
{
    public function __invoke(Booking $booking, DownloadBookingIcsAction $action): BinaryFileResponse
    {
        $tempFileName = $action->execute($booking);
        $downloadFileName = $action::getDownloadName();

        return response()->download($tempFileName, $downloadFileName);
    }
}
