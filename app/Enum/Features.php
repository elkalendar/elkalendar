<?php

declare(strict_types=1);

namespace App\Enum;

enum Features: string
{
    case EventCount = 'event-count';
    case BookingCount = 'booking-count';
    case IntegrationCount = 'integration-count';
    case PaymentIntegration = 'payment-integration';
}
