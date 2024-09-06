<?php

declare(strict_types=1);

namespace Modules\Booking\Notifications;

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

class BookingCreatedGuestNotification extends Notification implements ShouldQueue
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
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $calendar = Calendar::create()
            ->productIdentifier('elkalendar.com')
            ->event(function (Event $event) {
                $event->name($this->booking->event->name)
                    ->description(__('notifications.event.name') . $this->booking->event->name)
                    ->startsAt($this->booking->start_time->shiftTimezone($this->booking->timezone))
                    ->endsAt($this->booking->end_time->shiftTimezone($this->booking->timezone))
                    ->withoutTimezone()
                    ->address($this->booking->location ?? '');

                foreach ($this->booking->guests as $guest) {
                    $event->attendee($guest);
                }
            });

        $calendar->appendProperty(TextProperty::create('METHOD', 'REQUEST'));

        $guestNotes = $this->booking->notes ? $this->booking->notes : 'لا يوجد';

        return (new MailMessage())
            ->greeting(__('notifications.hello') . $this->booking->invitee_name)
            ->subject(__('notifications.event.booked') . $this->booking->event->name)
            ->line(__('notifications.event.booked') . $this->booking->event->name)
            ->line(__('notifications.booking.host') . $this->booking->event->user->name)
            ->line(__('notifications.event.name') . $this->booking->event->name)
            ->line(__('notifications.booking.guest') . $this->booking->invitee_name)
            ->line(
                __('notifications.booking.date') . Carbon::parse($this->booking->start_time)->format(
                    Defaults::DATE_FORMAT
                )
            )
            ->line(
                __('notifications.booking.time') . $this->booking->start_time->format(
                    Defaults::TIME_SHORT
                ) . ' - ' . $this->booking->end_time->format(Defaults::TIME_SHORT)
            )
            ->line(__('notifications.booking.timezone') . $this->booking->timezone)
            ->line(__('notifications.booking.notes') . $guestNotes)
            ->salutation(__('notifications.thanks'))
            ->attachData($calendar->get(), 'invite.ics', [
                'mime' => 'text/calendar; charset=UTF-8; method=REQUEST',
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
