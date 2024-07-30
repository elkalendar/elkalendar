import React from 'react';
import {
  Alert,
  Anchor,
  Badge,
  Box,
  Button,
  Collapse,
  ColorSwatch,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {format} from 'date-fns';
import dayjs from 'dayjs';
import {ar} from 'date-fns/locale';
import {formatInTimeZone} from 'date-fns-tz';
import {BiLinkExternal} from 'react-icons/bi';
import BookingRawActions from '@/components/Booking/BookingItemActions';
import AddToCalendarButtons from '@/components/AddToCalendarButtons';
import {getUserTimeFormat} from '@/utils/DateTimeHelpers';
import useTypedPage from '@/hooks/useTypedPage';
import {
  getEventLocationDisplayValueForHost,
  getEventLocationIcon,
} from '@/utils/EventLocationTypeHelpers';
import EventLocationTypes from '@/enums/EventLocationTypes';
import BookingItemLocation from "../BookingItemLocation";

interface BookingItemProps {
  booking: any;
}

export default function (props: BookingItemProps) {
  const [opened, {toggle}] = useDisclosure(false);
  const page = useTypedPage();
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();

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
                locale: ar,
              })}
            </Text>
            <Text size="sm">
              {
                formatInTimeZone(dayjs(props.booking.startTimeHost).toDate(), props.booking.event.schedule.timezone, `${getUserTimeFormat(page.props.auth.user.data.timeFormat)}`, {
                  locale: ar,
                })
              }
              {' '}
              -
              {formatInTimeZone(dayjs(props.booking.endTimeHost).toDate(), props.booking.event.schedule.timezone, `${getUserTimeFormat(page.props.auth.user.data.timeFormat)}`, {
                locale: ar,
              })}
            </Text>
          </Stack>

          <Flex direction="column" align="items-start" gap={12} mr={12}>
            <Text td={props.booking.cancelledAt && 'line-through'} size="sm">
              إجتماع لمدة
              <span className="text-emphasis">
                {' '}
                {props.booking.event.duration}
                {' '}
                دقيقة
                {' '}
              </span>
              مع &nbsp;
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
            الاجتماع:&nbsp;
            <span>
              {' '}
              {props.booking.event.name}
              {' '}
            </span>
          </Text>
          <Text size="sm">
            المدة:&nbsp;
            <span>
              {' '}
              {props.booking.event.duration}
              {' '}
              دقيقة
              {' '}
            </span>
          </Text>
          <Text size="sm">
            توقيت الحجز طبقاً للضيف:&nbsp;
            <span>
              {' '}
              {
                formatInTimeZone(dayjs(props.booking.startTimeGuest).toDate(), props.booking.timezone, `${getUserTimeFormat(page.props.auth.user.data.timeFormat)}`, {
                  locale: ar,
                })
              }
              {' '}
              -
              {' '}
              {formatInTimeZone(dayjs(props.booking.endTimeGuest).toDate(), props.booking.timezone, `${getUserTimeFormat(page.props.auth.user.data.timeFormat)}`, {
                locale: ar,
              })}
              {' '}

            </span>
          </Text>
          <Text size="sm">
            التوقيت الزمني للضيف:&nbsp;
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
                  انضمام إلى الاجتماع
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
                  انضمام إلى الاجتماع
                </Button>
              </Group>
            )
          }

          {
            props.booking.isCancelled && (
              <Alert w='100%' color="red" title="تم إلغاء الحجز">
                <Text size="sm">
                  تم إلغاء الحجز في:&nbsp;
                  <span className="text-emphasis">
                    {' '}
                    {
                      format(dayjs(props.booking.cancelledAt).toDate(), `${getUserTimeFormat(page.props.auth.user.data.timeFormat)} - EEEE - yyy/M/d `, {
                        locale: ar,
                      })
                    }
                    {' '}

                  </span>
                </Text>
                <Text size="sm">
                  سبب الإلغاء:&nbsp;
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
