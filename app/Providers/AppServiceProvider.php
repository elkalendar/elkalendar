<?php

declare(strict_types=1);

namespace App\Providers;

use App\Models\User;
use App\Onboarding\Onboard;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use SocialiteProviders\YottaHQ\Provider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment('local')) {
            $this->app->register(\PrettyRoutes\ServiceProvider::class);
            $this->app->register(\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Event::listen(function (\SocialiteProviders\Manager\SocialiteWasCalled $event) {
            $event->extendSocialite('yottahq', Provider::class);
            $event->extendSocialite('zoom', \SocialiteProviders\Zoom\Provider::class);
        });

        Onboard::addStep('البداية')
            ->link(url('/onboarding/intro'))
            ->cta('إستكمال')
            ->attributes([
                'number' => 0,
                'summary' => 'مرحبا بك في تطبيق كالندر',
                'description' => 'يسعدنا انضمامك لنا في تطبيق كالندر ونتمنى لك تجربة ممتعة.',
            ])
            ->completeIf(function (User $model) {
                return $model->settings()->get('onboarding.intro.finished');
            });

        Onboard::addStep('البيانات الاساسية')
            ->link(url('/onboarding/step1'))
            ->cta('إستكمال')
            ->attributes([
                'number' => 1,
                'summary' => 'تأكيد البيانات الاساسية لإستخدام حسابك',
                'description' => 'قم باختيار اسم مستخدم مميز حيث انه سيكون المعرف الخاص بك في رابط الكالندر.',
            ])
            ->completeIf(function (User $model) {
                return $model->settings()->get('onboarding.step1.finished');
            });

        Onboard::addStep('البدء بالجدولة')
            ->link('/onboarding/final')
            ->cta('إستكمال')
            ->attributes([
                'number' => 3,
                'summary' => 'الانتقال الى لوحة التحكم',
                'description' => 'تأكيد عنوان البريد الالكتروني الخاص بك هام حيث سيصلك عليه جميع الاشعارات والتفاصيل الخاصة بالحجز.',
            ])
            ->completeIf(function (User $model) {
                return $model->settings()->get('onboarding.final.finished');
            });
    }
}
