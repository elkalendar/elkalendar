<?php

namespace SocialiteProviders\YottaHQ;

use SocialiteProviders\Manager\SocialiteWasCalled;

class YottaHQExtendSocialite
{
    /**
     * Register the provider.
     */
    public function handle(SocialiteWasCalled $socialiteWasCalled)
    {
        $socialiteWasCalled->extendSocialite('yottahq', Provider::class);
    }
}
