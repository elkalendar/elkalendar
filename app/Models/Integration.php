<?php

declare(strict_types=1);

namespace App\Models;

use App\Entities\GoogleAccessToken;
use App\Entities\ZoomAccessToken;
use App\Enum\Integrations;
use DateTime;
use Glorand\Model\Settings\Traits\HasSettingsField;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Crypt;
use Mtvs\EloquentHashids\HasHashid;
use Mtvs\EloquentHashids\HashidRouting;

/**
 * @property int $id
 * @property int $user_id
 * @property string $provider
 * @property string $provider_id
 * @property string $name
 * @property string $nickname
 * @property string $email
 * @property string $avatar
 * @property string $token
 * @property string $refresh_token
 * @property DateTime $token_created_at
 * @property DateTime $token_expires_at
 * @property int $token_expires_in
 * @property string $settings
 * @property DateTime $created_at
 * @property DateTime $updated_at
 */
class Integration extends Model
{
    use HasHashid;
    use HashidRouting;
    use HasSettingsField;
    use SoftDeletes;

    protected $guarded = [];

    protected $appends = [
        'hashid',
    ];

    protected $casts = [
        'token_expires_at' => 'datetime',
        'token_created_at' => 'datetime',
    ];

    public $defaultSettings = [
        'sync_bookings' => true,
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getAccessToken(): null|GoogleAccessToken|ZoomAccessToken
    {
        if ($this->provider === Integrations::PROVIDER_GOOGLE_CALENDAR) {
            return new GoogleAccessToken(
                Crypt::decryptString($this->token),
                Crypt::decryptString($this->refresh_token),
                $this->token_expires_in,
                $this->token_created_at->timestamp,
                $this->id,
            );
        }

        if ($this->provider === Integrations::PROVIDER_ZOOM) {
            return new ZoomAccessToken(
                Crypt::decryptString($this->token),
                Crypt::decryptString($this->refresh_token),
                $this->token_expires_at,
                $this->token_created_at,
                $this->id,
            );
        }

        return null;
    }
}
