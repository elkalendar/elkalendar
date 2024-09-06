import React from 'react';
import {Anchor, Flex, Group, Text} from "@mantine/core";
import {getEventLocationIcon} from "@/utils/EventLocationTypeHelpers";
import EventLocationTypes from "@/enums/EventLocationTypes";
import {useTranslation} from "react-i18next";

interface BookingItemLocationProps {
  booking: any;
}

function BookingItemLocation(props: BookingItemLocationProps) {
  const {t} = useTranslation();

  return (
    <div>
      {
        props.booking.location && (
          <Group gap={8} align="items-start">
            {getEventLocationIcon(props.booking.location)}

            <Flex direction="column" gap={2}>
              {
                props.booking.location === EventLocationTypes.CUSTOM_LINK &&
                <Anchor size="sm" href={props.booking.locationData?.link} target='_blank'>
                  {t('btn.meeting_link')}
                </Anchor>
              }

              {
                props.booking.location === EventLocationTypes.GOOGLE_MEET &&
                <Anchor size="sm" href={props.booking.locationData?.googleMeetLink} target='_blank'>
                  {props.booking.locationData?.googleMeetLink}
                </Anchor>
              }

              {
                props.booking.location === EventLocationTypes.ZOOM &&
                <Anchor size="sm" href={props.booking.locationData?.zoomMeetingLink} target='_blank'>
                  {t('btn.meeting_link')}
                </Anchor>
              }

              {
                (props.booking.location === EventLocationTypes.IN_PERSON_GUEST || props.booking.location === EventLocationTypes.IN_PERSON_HOST) &&
                <Text size="sm">
                  {props.booking.locationData?.address}
                </Text>
              }

              {
                (props.booking.location === EventLocationTypes.PHONE_OUTGOING || props.booking.location === EventLocationTypes.PHONE_INCOMING) &&
                <Text size="sm">
                  {props.booking.locationData?.phone}
                </Text>
              }

              {
                props.booking.location === EventLocationTypes.TEXT && <Text size="sm">
                  {props.booking.locationData?.text}
                </Text>
              }
            </Flex>
          </Group>
        )
      }
    </div>
  );
}

export default BookingItemLocation;
