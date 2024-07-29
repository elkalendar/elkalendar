<?php

namespace App\Services\Integrations;

use App\Entities\ZoomAccessToken;
use App\Enum\ZoomMeetingTypes;

class ZoomService
{
    public const MEETING_TYPE_SCHEDULE = 2;

    private \GuzzleHttp\Client $client;

    public function setAccessToken(ZoomAccessToken $zoomAccessToken): static
    {
        $this->client = \App\Clients\ZoomClient::make($zoomAccessToken);

        return $this;
    }

    public function createMeeting(
        string $topic,
        \DateTime $startTime,
        string $timezone,
        int $durationInMinutes = 30,
        ZoomMeetingTypes $type = ZoomMeetingTypes::MEETING_TYPE_SCHEDULE,
    ) {
        $body = json_encode([
            'topic' => $topic,
            'type' => $type->value,
            'start_time' => $startTime,
            'duration' => $durationInMinutes,
            'timezone' => $timezone,
            'settings' => [
                'host_video' => true,
                'participant_video' => true,
                'waiting_room' => true,
            ],
        ]);

        $response = $this->client->post('users/me/meetings', [
            'body' => $body,
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }

    public function getMeeting(string $meetingId)
    {
        $response = $this->client->get("meetings/{$meetingId}");

        return json_decode($response->getBody()->getContents(), true);
    }

    public function updateMeeting(string $meetingId, array $data)
    {
        $response = $this->client->patch("meetings/{$meetingId}", [
            'body' => json_encode($data),
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }

    public function deleteMeeting(string|int $meetingId)
    {
        $response = $this->client->delete("meetings/$meetingId");

        return json_decode($response->getBody()->getContents(), true);
    }
}
