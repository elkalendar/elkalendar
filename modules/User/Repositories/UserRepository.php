<?php

declare(strict_types=1);

namespace Modules\User\Repositories;

use App\Exceptions\UserNotFoundException;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UserRepository
{
    /**
     * @throws UserNotFoundException
     */
    public function getUserByUsername(string $username, string ...$with): User
    {
        $withArray = [];

        if (in_array('events', $with)) {
            $withArray['events'] = static function (HasMany $query) {
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
