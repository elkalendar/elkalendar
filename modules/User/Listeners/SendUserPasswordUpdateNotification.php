<?php

declare(strict_types=1);

namespace Modules\User\Listeners;

use Modules\User\Events\UserPasswordUpdated;
use Modules\User\Notifications\PasswordUpdatedNotification;

class SendUserPasswordUpdateNotification
{
    public function handle(UserPasswordUpdated $event)
    {
        $event->user->notify(new PasswordUpdatedNotification($event->user));
    }
}
