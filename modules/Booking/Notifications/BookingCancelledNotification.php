<?php

declare(strict_types=1);

namespace Modules\Booking\Notifications;

use App\Enum\Defaults;
use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BookingCancelledNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public Booking $booking)
    {
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $message = (new MailMessage())
            ->greeting(__('notifications.hello') . $this->booking->invitee_name)
            ->subject(__('notifications.event_cancelled') . $this->booking->event->name)
            ->line(__('notifications.event_cancelled') . $this->booking->event->name);

        if ($this->booking->cancelled_at) {
            $message->line(__('notifications.by_host'));
            $message->line(
                __('notifications.time_at') . $this->booking->cancelled_at->setTimezone(
                    $this->booking->timezone
                )->format(
                    Defaults::TIMESTAMP_FORMAT
                )
            );
        }

        $message->line(
            __('notifications.cancel_reason') . $this->booking->cancel_reason ?? __('notifications.cancel_reason_none')
        )
            ->salutation(__('notifications.thanks'));

        return $message;
    }
}
