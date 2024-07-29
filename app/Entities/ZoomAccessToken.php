<?php

declare(strict_types=1);

namespace App\Entities;

class ZoomAccessToken
{
    public function __construct(
        private string $accessToken,
        private string $refreshToken,
        private string $expiresAt,
        private readonly int|\DateTime|string $createdAt,
        private readonly int $integrationId,
    ) {
    }

    public function getAccessToken(): string
    {
        return $this->accessToken;
    }

    public function getRefreshToken(): string
    {
        return $this->refreshToken;
    }

    public function getExpiresAt(): string
    {
        return $this->expiresAt;
    }

    public function getIntegrationId()
    {
        return $this->integrationId;
    }

    public function toArray(): array
    {
        return [
            'access_token' => $this->accessToken,
            'refresh_token' => $this->refreshToken,
            'expires_at' => $this->expiresAt,
            'created' => $this->createdAt,
        ];
    }
}
