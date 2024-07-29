<?php

namespace App\Notifications\Bookings;

use App\Enum\Defaults;
use App\Enum\EventLocationTypes;
use App\Models\Booking;
use App\Services\ICalendarService;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

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
        $calendarAttachment = $this->iCalendarService->generate($this->booking);

        $guestNotes = $this->booking->notes ? $this->booking->notes : 'لا يوجد';

        $message = (new MailMessage())
            ->greeting('مرحباً '.$this->booking->invitee_name)
            ->subject('تم حجز الموعد بنجاح: '.$this->booking->event->name)
            ->line('تم حجز الموعد بنجاح: '.$this->booking->event->name)
            ->line('المستضيف: '.$this->booking->event->user->name);

        $message->line('تاريخ الحجز: '.Carbon::parse($this->booking->start_time)->format(Defaults::DATE_FORMAT))
            ->line('توقيت الحجز: '.$this->booking->getBookingTimeForGuestTimezone()->format('H:i').' - '.$this->booking->getBookingEndTimeForGuestTimezone()->format('H:i'))
            ->line('التوقيت الزمني: '.$this->booking->timezone);

        if ($this->booking->location !== EventLocationTypes::TEXT->value) {
            $message->line('طريقة عقد الاجتماع:'.__('enums.event_location_types.'.$this->booking->location));
        }

        switch ($this->booking->location) {
            case EventLocationTypes::GOOGLE_MEET->value:
                $message->line('الإنضمام إلى الاجتماع:');
                $message->action($this->booking->getMeetingLocation(), $this->booking->getMeetingLocation());
                break;
            case EventLocationTypes::PHONE_OUTGOING->value:
                $message->line('الإنضمام إلى الاجتماع: الإتصال بالرقم التالي');
                $message->action($this->booking->getMeetingLocation(), 'tel:'.$this->booking->getMeetingLocation());
                break;
            case EventLocationTypes::PHONE_INCOMING->value:
                $message->line('الإنضمام إلى الاجتماع:');
                $message->line('المستضيف سيتصل بك على الرقم التالي: '.$this->booking->getMeetingLocation());
                break;
            case EventLocationTypes::ZOOM->value:
                $message->line($this->booking->getMeetingLocation(), $this->booking->getMeetingLocation());
                break;
            case EventLocationTypes::LINK->value:
                $message->line('الإنضمام إلى الاجتماع من خلال الرابط التالي:');
                $message->line($this->booking->getMeetingLocation());
                break;
            case EventLocationTypes::TEXT->value:
                $message->line('طريقة عقد الاجتماع: '.$this->booking->getMeetingLocation());
                break;
            case EventLocationTypes::IN_PERSON_GUEST->value:
            case EventLocationTypes::IN_PERSON_HOST->value:
                $message->line('العنوان: '.$this->booking->getMeetingLocation());
                break;
        }

        $message->line('ملاحظات من قبل المدعو: '.$guestNotes)
            ->salutation('شكراً لإستخدامك الكالندر ❤️')
            ->action('تفاصيل الحجز', route('booking.show-booking', $this->booking->id))
            ->attachData($calendarAttachment, 'invite.ics', [
                'mime' => 'text/calendar; charset=UTF-8; method=REQUEST',
            ]);

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
