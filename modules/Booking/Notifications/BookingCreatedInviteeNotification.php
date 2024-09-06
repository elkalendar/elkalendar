<?php

declare(strict_types=1);

namespace Modules\Booking\Notifications;

use App\Enum\Defaults;
use App\Enum\EventLocationTypes;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Modules\Booking\Services\ICalendarService;

class BookingCreatedInviteeNotification extends Notification implements ShouldQueue
{
    use Queueable;

    private readonly ICalendarService $iCalendarService;

    public function __construct(
        public Booking $booking,
    ) {
        $this->iCalendarService = app(ICalendarService::class);
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
        $calendarAttachment = $this->iCalendarService->generate($this->booking);

        $guestNotes = $this->booking->notes ? $this->booking->notes : __('notifications.booking.notes_none');

        $message = (new MailMessage())
            ->greeting(__('notifications.hello') . $this->booking->invitee_name)
            ->subject(__('notifications.event.booked') . $this->booking->event->name)
            ->line(__('notifications.event.booked') . $this->booking->event->name)
            ->line(__('notifications.booking.host') . $this->booking->event->user->name);

        $message->line(__('notifications.booking.date') . Carbon::parse($this->booking->start_time)->format(Defaults::DATE_FORMAT))
            ->line(
                __('notifications.booking.time') . $this->booking->getBookingTimeForGuestTimezone()->format(Defaults::TIME_SHORT)
                . ' - ' .
                $this->booking->getBookingEndTimeForGuestTimezone()->format(Defaults::TIME_SHORT)
            )
            ->line(__('notifications.booking.timezone') . $this->booking->timezone);

        if ($this->booking->location !== EventLocationTypes::TEXT->value) {
            $message->line(__('notifications.booking.location') . __('enums.event_location_types.' . $this->booking->location));
        }

        switch ($this->booking->location) {
            case EventLocationTypes::PHONE_OUTGOING->value:
                $message->line(__('notifications.locations.guest_call'));
                $message->action($this->booking->getMeetingLocation(), 'tel:' . $this->booking->getMeetingLocation());
                break;
            case EventLocationTypes::PHONE_INCOMING->value:
                $message->line(__('notifications.locations.join'));
                $message->line(__('notifications.locations.host_call') . $this->booking->getMeetingLocation());
                break;
            case EventLocationTypes::GOOGLE_MEET->value:
            case EventLocationTypes::LINK->value:
            case EventLocationTypes::ZOOM->value:
                $message->line(__('notifications.locations.join'));
                $message->action($this->booking->getMeetingLocation(), $this->booking->getMeetingLocation());
                break;
            case EventLocationTypes::TEXT->value:
                $message->line(__('notifications.locations.text') . $this->booking->getMeetingLocation());
                break;
            case EventLocationTypes::IN_PERSON_GUEST->value:
            case EventLocationTypes::IN_PERSON_HOST->value:
                $message->line(__('notifications.locations.address') . $this->booking->getMeetingLocation());
                break;
        }

        $message->line(__('notifications.booking.notes') . $guestNotes)
            ->salutation(__('notifications.thanks'))
            ->action(__('notifications.booking.details'), route('booking.show-booking', $this->booking->id))
            ->attachData($calendarAttachment, 'invite.ics', [
                'mime' => 'text/calendar; charset=UTF-8; method=REQUEST',
            ]);

        return $message;
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
