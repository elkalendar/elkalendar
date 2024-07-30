import React from 'react';
import { Flex } from '@mantine/core';
import EventLocationItem from '@/components/EventLocationItem';
import EventLocationTypes from "@/enums/EventLocationTypes";

interface EventLocationsListProps {
  locations: any[];
  event: any;
  onEdit: (locationType: EventLocationTypes) => void;
}

function EventLocationsList(props: EventLocationsListProps) {
  const locations = props.locations || [];

  return (
    <Flex direction="column" gap={12}>
      {locations.map((location, index) => (
        <EventLocationItem
          key={index}
          location={location}
          event={props.event}
          onEdit={(locationType) => props.onEdit(locationType)}
        />
      ))}
    </Flex>
  );
}

export default EventLocationsList;
