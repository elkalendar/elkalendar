<?php

declare(strict_types=1);

namespace Modules\User\Notifications;

use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PasswordUpdatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public User $user)
    {
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage())
            ->greeting('Hello, ' . $this->user->name . '!')
            ->line('This is to let you know that your password was just changed using the email address ' . $this->user->email . '.')
            ->line('If this was you, you don\'t need to do anything.')
            ->line('If you didn\'t make this change:')
            ->action('Reset Your Password Now!', 'https://app.' . config('app.domain') . '/forgot-password')
            ->line('Thank you for using ' . __('app.name', locale: $this->user->settings()->get('language')) . '!')
            ->line('elKalendar Team');
    }
}
