import React, {useState} from 'react';
import {
  Anchor,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Image,
  Modal,
  Stack,
  Text,
  Textarea,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import {formatInTimeZone} from 'date-fns-tz';
import dayjs from 'dayjs';
import {Head, useForm} from '@inertiajs/inertia-react';
import {DateFnsFormat} from '@/enums/Time';
import {getEventLocationForConfirmation, getEventLocationIcon,} from '@/utils/EventLocationTypeHelpers';
import useTypedPage from '@/hooks/useTypedPage';
import AddToCalendarButtons from '@/components/AddToCalendarButtons';
import {MdOutlineCancel} from "react-icons/md";
import {FaX} from "react-icons/fa6";
import {useTranslation} from "react-i18next";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import {Booking, Event, Host} from "@/types/entities";
import useSuccessToast from "@/hooks/useSuccessToast";

interface Props {
  host: Host;
  booking: Booking;
  event: Event;
}

export default function (props: Props) {
  const successToast = useSuccessToast();
  const colorScheme = useMantineColorScheme();
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const {t} = useTranslation();
  const dateFnsLocale = useDateFnsLocale();

  const form = useForm({
    cancel_reason: '',
  });

  return (
    <Center>
      <Head title={t('bookings.confirmed_title')}/>
      <Modal
        centered
        opened={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        title={t('bookings.cancel_title')}
      >
        <Flex gap={22} direction="column">
          <Textarea
            withAsterisk
            label={t('bookings.cancel_reason')}
            description={t('bookings.cancel_reason_desc')}
            placeholder={t('bookings.cancel_reason_placeholder')}
            error={form.errors.cancel_reason}
            value={form.data.cancel_reason}
            onChange={(e) => form.setData('cancel_reason', e.currentTarget.value)}
          />

          <div className="actions">
            <Button
              type="submit"
              color="red"
              onClick={() => {
                form.post(`/bookings/${props.booking.id}/cancel-by-guest`, {
                  preserveScroll: true,
                  onSuccess: () => {
                    successToast();
                    setCancelModalOpen(false);
                  },
                });
              }}
              leftSection={<MdOutlineCancel/>}
            >
              {t('btn.cancel_booking')}
            </Button>
          </div>
        </Flex>
      </Modal>

      <Flex
        my={66}
        bg={colorScheme.colorScheme === 'dark' ? 'gray.7' : 'gray.4'}
        direction="column"
        maw={600}
        style={{borderRadius: 8}}
      >
        <Flex bg={colorScheme.colorScheme === 'dark' ? 'gray.8' : 'gray.3'} gap={22} p={44} direction="column"
              align="center" justify="center">
          <BsFillCheckCircleFill size={42}/>
          <Title size="md">
            {t('bookings.confirmed_h1')}
          </Title>
          <Text>
            {t('bookings.confirmed_p')}
          </Text>
        </Flex>

        <Stack p={22} gap={22}>
          <Flex direction="column">
            <Text fw='bold'>
              {t('bookings.event_name')}
            </Text>
            <Group>
              {props.event.name}
            </Group>
          </Flex>

          <Flex direction="column">
            <Text fw='bold'>
              {t('bookings.time')}
            </Text>
            <Flex
              direction="column"
              gap={2}
            >
              <Text>
                {
                  formatInTimeZone(dayjs(props.booking.startTimeGuest).toDate(), props.booking.timezone, DateFnsFormat.DATE, {
                    locale: dateFnsLocale,
                  })
                }
              </Text>
              <span>
                {' '}
                {
                  formatInTimeZone(dayjs(props.booking.startTimeGuest).toDate(), props.booking.timezone, DateFnsFormat.TIME12, {
                    locale: dateFnsLocale,
                  })
                }
                {' '}
                -
                {' '}
                {formatInTimeZone(dayjs(props.booking.endTimeGuest).toDate(), props.booking.timezone, DateFnsFormat.TIME12, {
                  locale: dateFnsLocale,
                })}
                &nbsp;
                {t('bookings.timezone')}
                &nbsp;
                ({props.booking.timezone})
              </span>
            </Flex>
          </Flex>

          <Flex direction="column">
            <Text fw='bold'>
              {t('bookings.location')}
            </Text>
            <Flex justify="items-start" gap={8}>
              <Group>
                {getEventLocationIcon(props.booking.location.type)}
              </Group>

              <Flex direction="column" align="items-start">
                <Text>{getEventLocationForConfirmation(props.booking.location.type, props.booking.locationData)}</Text>
              </Flex>
            </Flex>
          </Flex>

          <Divider/>

          <Flex>
            <Button
              color="red"
              variant="subtle"
              leftSection={<FaX/>}
              size="xs"
              onClick={() => setCancelModalOpen(true)}
            >
              {t('btn.cancel_booking')}
            </Button>
          </Flex>

          <Flex direction="column">
            <AddToCalendarButtons
              title={t('btn.add_to_calendar')}
              bookingId={props.booking.id}
              googleLink={props.booking.addToCalendarLinksGuest.google}
              officeLink={props.booking.addToCalendarLinksGuest.office}
              outlookLink={props.booking.addToCalendarLinksGuest.outlook}
            />
          </Flex>

          <Flex justify='center'>
            <Button
              component="a"
              href={props.host.link}
              variant='subtle'
            >
              {t('btn.back_to_page')}
            </Button>
          </Flex>
        </Stack>

        <Flex bg={colorScheme.colorScheme === 'dark' ? 'gray.8' : 'gray.3'} gap={12} p={44} direction="column"
              align="center" justify="center">
          <Image w={44} src="/logo.svg"/>

          <Text size="sm">
            {t('bookings.confirmed_footer')}
            &nbsp;
            <Anchor target="_blank" href="https://elkalendar.com">
              {t('app.name')}
            </Anchor>
          </Text>
        </Flex>
      </Flex>
    </Center>
  );
}
