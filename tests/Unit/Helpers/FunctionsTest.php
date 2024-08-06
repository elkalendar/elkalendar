<?php

declare(strict_types=1);

namespace Tests\Unit\Helpers;

use Tests\TestCase;

class FunctionsTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        config(['app.domain_with_scheme' => 'https://example.com']);
    }

    public function testIsRTLReturnsTrueForArabic()
    {
        app()->setLocale('ar');
        $this->assertTrue(isRTL(), 'isRTL should return true when locale is Arabic');
    }

    public function testIsRTLReturnsFalseForNonArabic()
    {
        app()->setLocale('en');
        $this->assertFalse(isRTL(), 'isRTL should return false when locale is not Arabic');
    }

    public function testPublicUrlReturnsCorrectUrlWithNonNullPath()
    {
        $result = publicUrl('path/to/resource');
        $this->assertEquals('https://example.com/path/to/resource', $result, 'publicUrl should correctly append path to base URL');
    }

    public function testPublicUrlReturnsBaseUrlWhenPathIsNull()
    {
        $result = publicUrl(null);
        $this->assertEquals('https://example.com/', $result, 'publicUrl should return base URL with trailing slash when path is null');
    }
}
