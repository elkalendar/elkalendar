<?php

declare(strict_types=1);

namespace App\Notifications\Bookings;

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
            ->greeting('مرحباً ' . $this->booking->invitee_name)
            ->subject('تم الغاء الحجز: ' . $this->booking->event->name)
            ->line('تم الغاء حجز الموعد: ' . $this->booking->event->name);

        if ($this->booking->cancelled_at) {
            $message->line('بواسطة المستضيف');
            $message->line(
                'في التوقيت: ' . $this->booking->cancelled_at->setTimezone($this->booking->timezone)->format(
                    Defaults::TIMESTAMP_FORMAT
                )
            );
        }

        $message->line('سبب الالغاء: ' . $this->booking->cancel_reason ?? 'لم يتم تحديد سبب الالغاء')
            ->salutation('شكراً لإستخدامك الكالندر ❤️');

        return $message;
    }
}
