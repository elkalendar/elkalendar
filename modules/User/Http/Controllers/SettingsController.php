<?php

declare(strict_types=1);

namespace Modules\User\Http\Controllers;

use App\Enum\Countries;
use Inertia\Inertia;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Modules\User\Actions\SavePublicPageAction;
use Modules\User\Http\Requests\AppearanceSettingsRequest;
use Modules\User\Http\Requests\GeneralSettingsRequest;
use Modules\User\Http\Requests\PublicPageSettingsRequest;

class SettingsController
{
    public function general(): \Inertia\Response
    {
        $countries = Countries::getProcessedCountries();
        $languages = LaravelLocalization::getSupportedLocales();

        return Inertia::render('Settings/General', [
            'countries' => $countries,
            'languages' => $languages,
        ]);
    }

    public function appearance(): \Inertia\Response
    {
        return Inertia::render('Settings/Appearance');
    }

    public function publicPage(): \Inertia\Response
    {
        return Inertia::render('Settings/PublicPage');
    }

    public function notifications(): \Inertia\Response
    {
        return Inertia::render('Settings/Notifications');
    }

    public function saveGeneral(GeneralSettingsRequest $request): \Illuminate\Http\RedirectResponse
    {
        auth()->user()->settings()->setMultiple([
            'language' => $request->get('language'),
            'country' => $request->get('country'),
            'timeFormat' => $request->get('timeFormat'),
            'allowSeoIndexing' => $request->get('allowSeoIndexing'),
        ]);

        return redirect()->back();
    }

    public function savePublicPage(PublicPageSettingsRequest $request, SavePublicPageAction $action): void
    {
        $action->execute(
            $request->file('photo'),
            $request->get('name'),
            $request->get('profileMessage'),
            $request->get('username'),
        );
    }

    public function saveAppearance(AppearanceSettingsRequest $request): \Illuminate\Http\RedirectResponse
    {
        auth()->user()->settings()->set('theme', $request->get('theme'));

        return redirect()->back();
    }
}
