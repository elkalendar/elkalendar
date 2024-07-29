<?php

namespace App\Notifications\User;

use App\Events\FacebookUserDeauthorized;
use App\Events\ZoomUserDeauthorized;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DeauthorizationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public string $event)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        switch ($this->event) {
            case FacebookUserDeauthorized::class:
                $message = (new MailMessage())
                    ->line('لقد قمت بإلغاء تفويض تطبيقنا للوصول إلى حسابك على موقع التواصل الاجتماعي الفيسبوك.')
                    ->line('لن تتمكن من تسجيل الدخول إلى حسابك على موقعنا باستخدام حسابك على الفيسبوك بعد الان.')
                    ->line('اذا كنت ترغب في استخدام حسابك على الفيسبوك لتسجيل الدخول الى الكالندر مرة اهرى، يمكنك ربط حسابك على الفيسبوك من جديد من خلال الرابط التالي.')
                    ->action('ربط حساب زووم Zoom', route('socialLogin.redirect', [
                        'provider' => 'facebook',
                    ]));
                break;
            case ZoomUserDeauthorized::class:
                $message = (new MailMessage())
                    ->line('لقد قمت بإلغاء تفويض تطبيقنا للوصول إلى حسابك على خدمة زووم Zoom.')
                    ->line('لن تتمكن من استخدام خدمة zoom لإنشاء اجتماعاتك على موقعنا تلقائياً بعد الان.')
                    ->line('اذا كنت ترغب في استخدام خدمة زووم Zoom مع الكالندر مرة أخرى، يمكنك اعادة ربط حسابك على خدمة زووم Zoom من جديد من خلال الرابط التالي.')
                    ->action('ربط حساب زووم Zoom', route('apps.connect', [
                        'key' => 'zoom',
                    ]));
                break;
            default:
                $message = 'Your account has been deauthorized.';
        }

        return $message;
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
