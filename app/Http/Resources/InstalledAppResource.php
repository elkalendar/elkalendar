<?php
declare(strict_types=1);
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InstalledAppResource extends JsonResource
{
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
