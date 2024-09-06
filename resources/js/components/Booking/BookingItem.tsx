import React from 'react';
import {
  Alert,
  Box,
  Button,
  Collapse,
  ColorSwatch,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {format} from 'date-fns';
import dayjs from 'dayjs';
import {formatInTimeZone} from 'date-fns-tz';
import {BiLinkExternal} from 'react-icons/bi';
import BookingRawActions from '@/components/Booking/BookingItemActions';
import AddToCalendarButtons from '@/components/AddToCalendarButtons';
import {getUserTimeFormat} from '@/utils/DateTimeHelpers';
import useTypedPage from '@/hooks/useTypedPage';
import BookingItemLocation from "../BookingItemLocation";
import {useTranslation} from "react-i18next";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";

interface BookingItemProps {
  booking: any;
}

export default function (props: BookingItemProps) {
  const {t} = useTranslation();
  const [opened, {toggle}] = useDisclosure(false);
  const page = useTypedPage();
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();
  const dateFnsLocale = useDateFnsLocale();

  return (
    <Box
      mih={120}
      w="100%"
      mx="auto"
      mb={10}
      p={12}
      style={{
        border: '1px solid #e3e3e3',
        borderRadius: '8px',
        backgroundColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[2],
        borderColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[4],
      }}
    >
      <Group mb={5} align="items-start" justify="space-between">
        <Group align="items-start">
          <Stack gap={0}>
            <Text size="sm">
              {format(dayjs(props.booking.startTimeHost).toDate(), 'EEEE - yyy/M/d', {
                locale: dateFnsLocale,
              })}
            </Text>
            <Text size="sm">
              {
                formatInTimeZone(dayjs(props.booking.startTimeHost).toDate(), props.booking.event.schedule.timezone, `${getUserTimeFormat(page.props.auth.user.timeFormat)}`, {
                  locale: dateFnsLocale,
                })
              }
              {' '}
              -
              {formatInTimeZone(dayjs(props.booking.endTimeHost).toDate(), props.booking.event.schedule.timezone, `${getUserTimeFormat(page.props.auth.user.timeFormat)}`, {
                locale: dateFnsLocale,
              })}
            </Text>
          </Stack>

          <Flex direction="column" align="items-start" gap={12} mr={12}>
            <Text td={props.booking.cancelledAt && 'line-through'} size="sm">
              {t('bookings.duration')}
              <span className="text-emphasis">
                {' '}
                {props.booking.event.duration}
                {' '}
                {t('bookings.minute')}
                {' '}
              </span>
              {t('bookings.with')}
              &nbsp;
              <span className="text-emphasis">
                {props.booking.invitee.name}
              </span>
            </Text>
            <Group gap={8}>
              <ColorSwatch size={16} color={props.booking.event.color}/>
              <Text size="sm">{props.booking.event.name}</Text>
            </Group>

            <BookingItemLocation booking={props.booking}/>
          </Flex>
        </Group>

        <BookingRawActions opened={opened} toggle={toggle} booking={props.booking}/>
      </Group>

      <Collapse pt={12} in={opened}>
        <Divider mb={12}/>

        <Flex
          gap={8}
          direction="column"
          align="flex-start"
        >
          <Text size="sm">
            {t('bookings.event_name')}
            &nbsp;
            <span>
              {' '}
              {props.booking.event.name}
              {' '}
            </span>
          </Text>
          <Text size="sm">
            {t('bookings.duration')}
            &nbsp;
            <span>
              {' '}
              {props.booking.event.duration}
              {' '}
              {t('bookings.minute')}
              {' '}
            </span>
          </Text>
          <Text size="sm">
            {t('bookings.host_timezone')}
            &nbsp;
            <span>
              {' '}
              {
                formatInTimeZone(dayjs(props.booking.startTimeGuest).toDate(), props.booking.timezone, `${getUserTimeFormat(page.props.auth.user.timeFormat)}`, {
                  locale: dateFnsLocale,
                })
              }
              {' '}
              -
              {' '}
              {formatInTimeZone(dayjs(props.booking.endTimeGuest).toDate(), props.booking.timezone, `${getUserTimeFormat(page.props.auth.user.timeFormat)}`, {
                locale: dateFnsLocale,
              })}
              {' '}

            </span>
          </Text>
          <Text size="sm">
            {t('bookings.guest_timezone')}
            &nbsp;
            <span>
              {' '}
              {props.booking.timezone}
              {' '}
            </span>
          </Text>

          {
            props.booking.locationData?.googleMeetLink && (
              <Group>
                <Button
                  component="a"
                  target="_blank"
                  href={props.booking.locationData.googleMeetLink}
                  variant="outline"
                  leftSection={<BiLinkExternal/>}
                >
                  {t('bookings.join')}
                </Button>
              </Group>
            )
          }

          {
            props.booking.locationData?.zoomMeetingLink && (
              <Group>
                <Button
                  component="a"
                  target="_blank"
                  href={props.booking.locationData.zoomMeetingLink}
                  variant="outline"
                  leftSection={<BiLinkExternal/>}
                >
                  {t('bookings.join')}
                </Button>
              </Group>
            )
          }

          {
            props.booking.isCancelled && (
              <Alert w='100%' color="red" title={t('bookings.cancelled_desc')}>
                <Text size="sm">
                  {t('bookings.cancelled_at')}
                  &nbsp;
                  <span className="text-emphasis">
                    {' '}
                    {
                      format(dayjs(props.booking.cancelledAt).toDate(), `${getUserTimeFormat(page.props.auth.user.timeFormat)} - EEEE - yyy/M/d `, {
                        locale: dateFnsLocale,
                      })
                    }
                    {' '}

                  </span>
                </Text>
                <Text size="sm">
                  {t('bookings.cancel_reason')}
                  &nbsp;
                  <span className="text-emphasis">
                    {' '}
                    {props.booking.cancelReason ?? '-'}
                    {' '}
                  </span>
                </Text>
              </Alert>
            )
          }

          <Group>
            {
              !props.booking.isCancelled && (
                <AddToCalendarButtons
                  bookingId={props.booking.id}
                  googleLink={props.booking.addToCalendarLinksHost.google}
                  officeLink={props.booking.addToCalendarLinksHost.office}
                  outlookLink={props.booking.addToCalendarLinksHost.outlook}
                />
              )
            }
          </Group>
        </Flex>
      </Collapse>
    </Box>
  );
}
