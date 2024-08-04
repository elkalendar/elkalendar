<?php

namespace Tests\Unit\Services;

use App\Services\ColorService;
use Tests\TestCase;

class ColorServiceTest extends TestCase
{
    public function testGenerateHexReturnsString()
    {
        $hex = ColorService::generateHex();
        $this->assertIsString($hex, 'Expected generateHex to return a string');
    }

    public function testGenerateHexFormat()
    {
        $hex = ColorService::generateHex();

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
