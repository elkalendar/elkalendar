<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Exceptions\UserNotFoundException;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Arr;

class UserRepository
{
    /**
     * @throws UserNotFoundException
     */
    public function getUserByUsername(string $username, array $with = []): User
    {
        $withArray = [];

        if (Arr::has($with, 'events')) {
            $withArray['events'] = function (HasMany $query) {
                $query->where('show_in_profile', 1)
                    ->where('is_active', 1);
            };
        }

        $user = User::with($withArray)->where('username', $username)->first();

        if (! $user) {
            throw new UserNotFoundException('User not found: '.$username);
        }

        return $user;
    }
}
