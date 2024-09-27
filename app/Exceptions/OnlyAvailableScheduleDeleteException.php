<?php

declare(strict_types=1);

namespace App\Exceptions;

use Exception;

class OnlyAvailableScheduleDeleteException extends Exception
{
    protected $message = 'Failed to delete schedule, you have to have at least one schedule.';
}
