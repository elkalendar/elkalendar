<?php

declare(strict_types=1);

namespace App\Entities;

class GoogleAccessToken
{
    public function __construct(
        private readonly string $accessToken,
        private readonly string $refreshToken,
        private readonly int $expiresIn,
        private readonly int $createdAt,
        private readonly int $integrationId,
    ) {
    }

    public function getCreatedAt(): int
    {
        return $this->createdAt;
    }

    public function getIntegrationId(): int
    {
        return $this->integrationId;
    }

    public function getAccessToken(): string
    {
        return $this->accessToken;
    }

    public function getRefreshToken(): string
    {
        return $this->refreshToken;
    }

    public function getExpiresIn(): int
    {
        return $this->expiresIn;
    }

    public function toArray(): array
    {
        return [
            'access_token' => $this->accessToken,
            'refresh_token' => $this->refreshToken,
            'expires_in' => $this->expiresIn,
            'created' => $this->createdAt,
        ];
    }
}
