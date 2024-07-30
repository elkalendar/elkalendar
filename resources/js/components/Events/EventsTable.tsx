import React from 'react';
import { Flex } from '@mantine/core';
import EventRow from '@/components/Events/EventRow';
import { Event } from '@/types/entities';

interface EventsTableProps {
  events: Event[]
}

function EventsTable(props: EventsTableProps) {
  return (
    <Flex direction="column">
      {
        props.events.map((event: Event, index) => (
          <EventRow event={event} key={index} />
        ))
      }
    </Flex>
  );
}

export default EventsTable;
