<?php

namespace App\Services\Integrations;

use App\Clients\GoogleClient;
use App\Entities\Attendee;
use App\Entities\GoogleAccessToken;
use Google\Service\Calendar\Event as GoogleEvent;
use Google\Service\Calendar\EventDateTime;
use Illuminate\Support\Str;

class GoogleCalendarService
{
    private \Google\Service\Calendar $googleCalendar;

    public function setAccessToken(GoogleAccessToken $googleAccessToken): static
    {
        $client = GoogleClient::make($googleAccessToken);

        $this->googleCalendar = new \Google\Service\Calendar($client);

        return $this;
    }

    public function getCalendarList(): \Google\Service\Calendar\CalendarList
    {
        return $this->googleCalendar->calendarList->listCalendarList();
    }

    public function getEvents(string $calendarId = 'primary'): \Google\Service\Calendar\Events
    {
        return $this->googleCalendar->events->listEvents($calendarId);
    }

    public function createEvent(
        \DateTime $start,
        \DateTime $end,
        string $timezone,
        string $summary,
        array $attendees,
        string $calendarId,
        ?string $description = null,
        ?string $location = null,
    ): GoogleEvent {
        $startTime = new EventDateTime();
        $startTime->setDateTime($start);

        $endTime = new EventDateTime();
        $endTime->setDateTime($end);

        $event = new GoogleEvent();
        $event->setStart($startTime);
        $event->setEnd($endTime);

        $solutionKey = new \Google\Service\Calendar\ConferenceSolutionKey();
        $solutionKey->setType('hangoutsMeet');

        $conferenceDataRequest = new \Google\Service\Calendar\CreateConferenceRequest();
        $conferenceDataRequest->setRequestId(Str::random(15));
        $conferenceDataRequest->setConferenceSolutionKey($solutionKey);

        $conferenceData = new \Google\Service\Calendar\ConferenceData();
        $conferenceData->setCreateRequest($conferenceDataRequest);

        $event->setConferenceData($conferenceData);
        $event->setSummary($summary);

        if ($description) {
            $event->setDescription($description);
        }

        if ($location) {
            $event->setLocation($location);
        }

        $eventAttendees = [];
        foreach ($attendees as /** @var Attendee $attendee */ $attendee) {
            $googleAttendee = new \Google\Service\Calendar\EventAttendee();
            $googleAttendee->setEmail($attendee->getEmail());

            if ($attendee->getName()) {
                $googleAttendee->setDisplayName($attendee->getName());
            }

            $eventAttendees[] = $googleAttendee;
        }

        $event->setAttendees($eventAttendees);

        return $this->googleCalendar->events->insert(
            $calendarId,
            $event,
            ['conferenceDataVersion' => 1],
        );
    }

    public function deleteEvent(string $eventId, string $calendarId = 'primary'): void
    {
        $this->googleCalendar->events->delete($calendarId, $eventId);
    }
}
