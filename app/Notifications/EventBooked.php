<?php

namespace App\Notifications;

use App\Enum\Defaults;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Spatie\IcalendarGenerator\Components\Calendar;
use Spatie\IcalendarGenerator\Components\Event;
use Spatie\IcalendarGenerator\Properties\TextProperty;

class EventBooked extends Notification implements ShouldQueue
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
        $calendar = Calendar::create()
            ->productIdentifier('elkalendar.com')
            ->event(function (Event $event) {
                $event->name($this->booking->event->name)
                    ->description('الاجتماع:'.$this->booking->event->name)
                    ->startsAt(new \DateTime(Carbon::parse($this->booking->start_time), new \DateTimeZone($this->booking->timezone)))
                    ->endsAt(new \DateTime(Carbon::parse($this->booking->end_time), new \DateTimeZone($this->booking->timezone)))
                    ->withoutTimezone()
                    ->address($this->booking->location ?? '');

                foreach ($this->booking->guests as $guest) {
                    $event->attendee($guest);
                }
            });

        $calendar->appendProperty(TextProperty::create('METHOD', 'REQUEST'));

        return (new MailMessage())
            ->salutation('مرحباً '.$this->booking->event->user->name)
            ->subject('حجز جديد: '.$this->booking->event->name.' مع '.$this->booking->invitee_name)
            ->line('لديك حجز جديد 🎉')
            ->line('الاجتماع: '.$this->booking->event->name)
            ->line('المدعو الرئيسي: '.$this->booking->invitee_name)
            ->line('حضور آخرين: '.count($this->booking->guests) > 0 ? count($this->booking->guests) : '-')
            ->line('تاريخ ووقت الحجز: '.Carbon::parse($this->booking->start_time)->format(Defaults::TIMESTAMP_FORMAT_POST))
            ->line('التوقيت الزمني: '.$this->booking->timezone)
            ->line('ملاحظات من قبل المدعو: '.$this->booking->notes)
            ->line('شكراً لإستخدامك الكالندر ❤️')
            ->attachData($calendar->get(), 'invite.ics', [
                'mime' => 'text/calendar; charset=UTF-8; method=REQUEST',
            ]);
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
