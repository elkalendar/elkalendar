<?php

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

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(public Booking $booking)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $message = (new MailMessage())
            ->greeting('مرحباً '.$this->booking->invitee_name)
            ->subject('تم الغاء الحجز: '.$this->booking->event->name)
            ->line('تم الغاء حجز الموعد: '.$this->booking->event->name);

        if ($this->booking->cancelled_at) {
            $message->line('بواسطة المستضيف');
            $message->line('في التوقيت: '.$this->booking->cancelled_at->setTimezone($this->booking->timezone)->format(Defaults::TIMESTAMP_FORMAT));
        }

        $message->line('سبب الالغاء: '.$this->booking->cancel_reason ?? 'لم يتم تحديد سبب الالغاء')
            ->salutation('شكراً لإستخدامك الكالندر ❤️');

        return $message;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
