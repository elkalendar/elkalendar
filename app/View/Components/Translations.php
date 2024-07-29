<?php

namespace App\View\Components;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\View\Component;

class Translations extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        $locale = app()->getLocale();
        $translations = [];
        $phpTranslations = [];
        $jsonTranslations = [];

        if (File::exists(lang_path($locale))) {
            $phpTranslations = collect(File::allFiles(lang_path($locale)))
                ->filter(function ($file) {
                    return $file->getExtension() === 'php';
                })->flatMap(function ($file) {
                    $arr = [];

                    foreach (Arr::dot(File::getRequire($file->getRealPath())) as $key => $val) {
                        $arr[Str::remove('.php', $file->getFilename()).'.'.$key] = $val;
                    }

                    return $arr;
                })->toArray();
        }

        if (File::exists(resource_path("lang/$locale.json"))) {
            $jsonTranslations = json_decode(File::get(resource_path("lang/$locale.json")), true);
        }

        return view('components.translations', [
            'translations' => $phpTranslations,
        ]);
    }
}
