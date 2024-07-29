<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enum\Countries;
use App\Http\Requests\Settings\AppearanceSettingsRequest;
use App\Http\Requests\Settings\GeneralSettingsRequest;
use App\Http\Requests\Settings\PublicPageSettingsRequest;
use App\Http\Resources\IntegrationResource;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingsController
{
    public function general(): \Inertia\Response
    {
        $countries = Countries::getProcessedCountries();

        return Inertia::render('Settings/General', [
            'countries' => $countries,
        ]);
    }

    public function calendars(): \Inertia\Response
    {
        $integrations = auth()->user()->integrations()->get();

        return Inertia::render('Settings/Calendars', [
            'integrations' => IntegrationResource::collection($integrations),
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
            'country' => $request->get('country'),
            'timeFormat' => $request->get('timeFormat'),
            'allowSeoIndexing' => $request->get('allowSeoIndexing'),
        ]);

        return redirect()->back();
    }

    public function savePublicPage(PublicPageSettingsRequest $request): \Illuminate\Http\RedirectResponse
    {
        $user = auth()->user();

        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $photo->storePublicly(
                'profile-photos'
            );

            if ($user->settings()->get('profile_image')) {
                Storage::delete($user->settings()->get('profile_image'));
            }

            $user->settings()->set('profile_image', 'profile-photos/'.$photo->hashName());
        }

        auth()->user()->settings()->setMultiple([
            'profile_name' => $request->get('name'),
            'profile_message' => strip_tags($request->get('profileMessage')),
        ]);

        $user->forceFill([
            'username' => $request->get('username'),
        ])->save();

        return redirect()->back();
    }

    public function saveAppearance(AppearanceSettingsRequest $request): \Illuminate\Http\RedirectResponse
    {
        auth()->user()->settings()->set('theme', $request->get('theme'));

        return redirect()->back();
    }
}
