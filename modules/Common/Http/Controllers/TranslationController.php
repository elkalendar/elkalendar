<?php

declare(strict_types=1);

namespace Modules\Common\Http\Controllers;

use DirectoryIterator;
use RuntimeException;

class TranslationController
{
    public function __invoke()
    {
        $allTranslations = [];

        $directoryPath = lang_path(app()->getLocale() . '/frontend');
        if (!is_dir($directoryPath)) {
            $directoryPath = lang_path(config('app.fallback_locale') . '/frontend');
        }

        $iterator = new DirectoryIterator($directoryPath);

        foreach ($iterator as $fileInfo) {
            if ($fileInfo->isFile() && $fileInfo->getExtension() === 'php') {
                $translations = include $fileInfo->getPathname();
                $filename = strtolower($fileInfo->getBasename('.php'));

                if (is_array($translations)) {
                    $flattenedTranslations = $this->flattenTranslations($translations, $filename);
                    $allTranslations = array_merge($allTranslations, $flattenedTranslations);
                } else {
                    throw new RuntimeException(
                        'Translation file does not return an array: ' . $fileInfo->getPathname()
                    );
                }
            }
        }

        return $allTranslations;
    }

    private function flattenTranslations(array $translations, string $prefix = ''): array
    {
        $result = [];

        foreach ($translations as $key => $value) {
            $newKey = $prefix === '' ? $key : $prefix . '.' . $key;
            if (is_array($value)) {
                $result = array_merge($result, $this->flattenTranslations($value, $newKey));
            } else {
                $result[$newKey] = $value;
            }
        }

        return $result;
    }
}
