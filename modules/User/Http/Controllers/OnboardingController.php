<?php

declare(strict_types=1);

namespace Modules\User\Http\Controllers;

use App\Enum\Countries;
use App\Services\TimezoneService;
use Inertia\Inertia;
use Modules\User\Http\Requests\Step1Request;

class OnboardingController
{
    public function __construct(public readonly TimezoneService $timezoneService)
    {
    }

    public function intro()
    {
        if (auth()->user()->settings()->get('onboarding.intro.finished')) {
            return redirect('/onboarding/step1');
        }

        return Inertia::render('Onboarding/Intro', [
            'onboarding' => ! auth()->user() ? [] : [
                'finished' => auth()->user()->onboarding()->finished(),
                'steps' => auth()->user()->onboarding()->steps,
                'currentStep' => 0,
            ],
        ]);
    }

    public function step1()
    {
        if (! auth()->user()->settings()->get('onboarding.intro.finished')) {
            return redirect('/onboarding/intro');
        }

        if (auth()->user()->settings()->get('onboarding.step1.finished')) {
            return redirect('/onboarding/step2');
        }

        $timezones = $this->timezoneService->getTimezones();

        $countries = Countries::getProcessedCountries();

        return Inertia::render('Onboarding/Step1', [
            'onboarding' => ! auth()->user() ? [] : [
                'finished' => auth()->user()->onboarding()->finished(),
                'steps' => auth()->user()->onboarding()->steps,
                'currentStep' => 1,
            ],
            'countries' => $countries,
            'timezones' => $timezones,
        ]);
    }

    public function final()
    {
        if (! auth()->user()->settings()->get('onboarding.step1.finished')) {
            return redirect('/onboarding/step1');
        }

        if (auth()->user()->onboarding()->finished() || auth()->user()->settings()->get('onboarding.final.finished')) {
            return redirect('/');
        }

        auth()->user()->settings()->setMultiple([
            'onboarding.final.finished' => true,
            'onboarding.final.finishedAt' => now(),
        ]);

        return Inertia::render('Onboarding/Final', [
            'onboarding' => ! auth()->user() ? [] : [
                'finished' => auth()->user()->onboarding()->finished(),
                'steps' => auth()->user()->onboarding()->steps,
                'currentStep' => 2,
            ],
        ]);
    }

    public function handleIntro()
    {
        auth()->user()->settings()->setMultiple([
            'onboarding.intro.finished' => true,
            'onboarding.intro.finishedAt' => now(),
        ]);

        return redirect()->to('/onboarding/step1');
    }

    public function handleStep1(Step1Request $request)
    {
        $data = [
            'username' => $request->get('username'),
        ];

        auth()->user()->update($data);

        auth()->user()->settings()->setMultiple([
            'country' => $request->get('country'),
            'timezone' => $request->get('timezone'),
            'timeFormat' => $request->get('timeFormat'),
            'onboarding.step1.finished' => true,
            'onboarding.step1.finishedAt' => now(),
        ]);

        return redirect()->to('/onboarding/final');
    }
}
