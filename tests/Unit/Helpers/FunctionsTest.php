<?php

declare(strict_types=1);

namespace Tests\Unit\Helpers;

use Tests\TestCase;

class FunctionsTest extends TestCase
{
    public function testIsRtlReturnsTrueIfRtlLang()
    {
        $this->assertTrue(isRTL());
    }

    public function testIsRtlReturnsFalseIfLtrLang()
    {
        app()->setLocale('en');
        $this->assertFalse(isRTL());
    }
}
