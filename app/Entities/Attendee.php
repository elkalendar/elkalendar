<?php

namespace App\Entities;

class Attendee
{
    public function __construct(
        public string $email,
        public ?string $name,
    ) {
    }

    public function toArray(): array
    {
        return [
            'email' => $this->email,
            'name' => $this->name,
        ];
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getName(): ?string
    {
        return $this->name;
    }
}
