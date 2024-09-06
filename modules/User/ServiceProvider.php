<?php

declare(strict_types=1);

namespace Modules\User;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;
use Modules\User\Listeners\BootstrapUser;
use Modules\User\Onboarding\Onboard;

class ServiceProvider extends BaseServiceProvider
{
    public function register(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/Database/Migrations');
        $this->loadRoutesFrom(__DIR__ . '/Routes/web.php');
        $this->mergeConfigFrom(__DIR__ . '/config.php', 'user');
    }

    public function boot(): void
    {
        Event::listen(
            Registered::class,
            [BootstrapUser::class],
        );

        Onboard::addStep(__('onboarding.intro.title'))
            ->link(url('/onboarding/intro'))
            ->cta(__('onboarding.intro.cta'))
            ->attributes([
                'number' => 0,
                'summary' => __('onboarding.intro.summary'),
                'description' => __('onboarding.intro.description'),
            ])
            ->completeIf(function (User $model) {
                return $model->settings()->get('onboarding.intro.finished');
            });

        Onboard::addStep(__('onboarding.step1.title'))
            ->link(url('/onboarding/step1'))
            ->cta(__('onboarding.step1.cta'))
            ->attributes([
                'number' => 1,
                'summary' => __('onboarding.step1.summary'),
                'description' => __('onboarding.step1.description'),
            ])
            ->completeIf(function (User $model) {
                return $model->settings()->get('onboarding.step1.finished');
            });

        Onboard::addStep(__('onboarding.final.title'))
            ->link('/onboarding/final')
            ->cta(__('onboarding.final.cta'))
            ->attributes([
                'number' => 3,
                'summary' => __('onboarding.final.summary'),
                'description' => __('onboarding.final.description'),
            ])
            ->completeIf(function (User $model) {
                return $model->settings()->get('onboarding.final.finished');
            });
    }
}
