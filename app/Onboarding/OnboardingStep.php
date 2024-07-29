<?php

declare(strict_types=1);

namespace App\Onboarding;

class OnboardingStep extends \Spatie\Onboard\OnboardingStep
{
    /** @var callable|null */
    protected $skipIf;

    protected static function getFacadeAccessor(): string
    {
        return OnboardingSteps::class;
    }

    public function cta(string $cta): self
    {
        $this->attributes(['cta' => $cta]);

        return $this;
    }

    public function skipIf(callable $callback): self
    {
        $this->skipIf = $callback;

        return $this;
    }

    public function skipped(): bool
    {
        if ($this->skipIf && $this->model) {
            return once(fn () => app()->call($this->skipIf, ['model' => $this->model]));
        }

        return false;
    }
}
