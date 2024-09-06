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

    public function testGenerateHexReturnsString()
    {
        $hex = generateColorHex();
        $this->assertIsString($hex, 'Expected generateHex to return a string');
    }

    public function testGenerateHexFormat()
    {
        $hex = generateColorHex();

        // Check if it starts with '#'
        $this->assertEquals('#', $hex[0], 'Hex color should start with a #');

        // Check the length is 7
        $this->assertEquals(7, strlen($hex), 'Hex color should be 7 characters long');

        // Check each character is a valid hex
        for ($i = 1; $i < 7; $i++) {
            $this->assertMatchesRegularExpression('/^[0-9a-f]$/i', $hex[$i], "Character at position $i is not a valid hex character");
        }
    }
}
