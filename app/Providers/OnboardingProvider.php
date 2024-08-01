<?php

namespace App\Providers;

use App\Models\User;
use App\Onboarding\Onboard;
use Illuminate\Support\ServiceProvider;

class OnboardingProvider extends ServiceProvider
{

    public function register(): void
    {
    }

    public function boot(): void
    {
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
