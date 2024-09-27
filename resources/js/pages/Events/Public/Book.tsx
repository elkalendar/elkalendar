import React, {useState} from 'react';
import {
  Avatar,
  Badge,
  Button,
  Container,
  Flex,
  Group,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import {Head, InertiaLink} from '@inertiajs/inertia-react';
import {BiTime} from 'react-icons/bi';
import {useLocalStorage} from '@mantine/hooks';
import dayjs from 'dayjs';
import {Inertia} from '@inertiajs/inertia';
import {format, isPast} from 'date-fns';
import qs from 'query-string';
import {EventBookingCalendar} from '@/components/EventBookingCalendar';
import EventBookingForm from '@/components/Forms/EventBookingForm';
import {formatInTimeZone, toZonedTime} from "date-fns-tz";
import {DateFnsFormat} from "@/enums/Time";
import {Host, Event} from "@/types/entities";
import {useTranslation} from "react-i18next";
import {TimeFormatSwitcher} from "@/components/TimeFormatSwitcher";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import TimezoneSelector from '@/components/TimezoneSelector';

interface Props {
  currentMonth: any;
  host: Host;
  event: Event;
  availability: any;
  timezones: string[];
}

function Book(props: Props) {
  const {t} = useTranslation();
  const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const monthFromQS = qs.parse(location.search).month;
  const parsedMonthFromProps = dayjs(props.currentMonth).toDate();
  const [selectedTimezone, setSelectedTimezone] = useState(browserTimezone);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(monthFromQS ? parsedMonthFromProps : new Date());
  const [isLoadingAvailabilitiesForDay, setIsLoadingAvailabilitiesForDay] = useState(false);
  const [openBookingForm, setOpenBookingForm] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [is24Hours, setIs24Hours] = useLocalStorage({
    key: 'is24Hours',
    defaultValue: false,
    getInitialValueInEffect: false,
  });
  const dateFnsLocale = useDateFnsLocale();

  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();

  return (
    <Container
      pt={88}
      size="lg"
      style={{
        minHeight: 'calc(100vh - 100px)',
      }}
    >
      {
        !props.host.settings.allowSeoIndexing ?
          <Head title={props.event.name}>
            <meta name="robots" content="noindex, nofollow"/>
            <meta name="googlebot" content="noindex"/>
            <meta name="googlebot-news" content="nosnippet"/>
          </Head>
          : <Head title={props.event.name}/>
      }

      <SimpleGrid
        cols={
          selectedDate && !openBookingForm ? {base: 1, sm: 3} : {base: 1, sm: 2}
        }
        py={32}
        style={{
          backgroundColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[0],
        }}
      >
        <Stack
          p={22}
          gap={12}
        >
          <Group>
            <Tooltip label={props.host.name}>
              <Avatar
                href={props.host.link}
                component={InertiaLink}
                src={props.host.avatar}
                alt={props.host.name}
              />
            </Tooltip>
          </Group>

          <Text>
            {props.host.name}
          </Text>

          <Title mt={22} size="md">{props.event.name}</Title>
          <Text>{props.event.description}</Text>

          <Badge variant="light" color="gray">
            <Tooltip label={t('public.duration')}>
              <Flex align="center" gap={4}>
                <BiTime size={17}/>
                <Text size="sm" mt={3}>
                  {props.event.duration}
                  {' '}
                  {t('public.minute')}
                </Text>
              </Flex>
            </Tooltip>
          </Badge>

          <Group mt={22} w="100%">

          </Group>

          <Group mt={22} w="100%">
            <TimezoneSelector
              is24Hours={is24Hours}
              defaultTimezone={browserTimezone}
              selectedTimezone={selectedTimezone}
              timezones={props.timezones}
              onChange={(timezone) => {
                setSelectedTimezone(timezone);
              }}
            />
          </Group>
        </Stack>

        <Flex
          justify="center"
          align="center"
          w='100%'
          px={22}
        >
          {
            openBookingForm ? (
              <EventBookingForm
                event={props.event}
                host={props.host}
                is24Hours={is24Hours}
                bookingDate={selectedDate}
                bookingTimeSlot={selectedTimeSlot}
                guestTimezone={selectedTimezone}
                resetBookingTime={() => {
                  setOpenBookingForm(false);
                  setSelectedTimeSlot(null);
                }}
              />
            ) : (
              <EventBookingCalendar
                availability={props.availability}
                maxDate={props.event.maxFutureBookingDate ? dayjs(props.event.maxFutureBookingDate).toDate() : null}
                selectedDate={selectedDate}
                selectedMonth={selectedMonth}
                isLoading={isLoadingAvailabilitiesForDay}
                onMonthChange={(n) => {
                  setSelectedMonth(n);
                  Inertia.visit(`/${props.host.username}/${props.event.slug}?month=${format(n, 'yyy-MM')}`, {
                    onStart: () => {
                      setIsLoadingAvailabilitiesForDay(true);
                    },
                    onFinish: () => {
                      setIsLoadingAvailabilitiesForDay(false);
                    },
                  });
                }}
                onChange={(value) => {
                  setSelectedDate(value);
                  setSelectedTimeSlot(null);
                  setOpenBookingForm(false);
                }}
                days={props.availability}
              />
            )
          }
        </Flex>

        {
          selectedDate && !openBookingForm && (
            <Flex direction="column" gap={22}>
              <TimeFormatSwitcher
                is24Hours={is24Hours}
                onChange={(value) => setIs24Hours(value === '24')}
              />

              <ScrollArea h={400}>
                <Stack
                  px={22}
                  gap={12}
                >
                  {selectedDate && props.availability[format(selectedDate, 'yyy-MM-dd')].length > 0 && props.availability[format(selectedDate, 'yyy-MM-dd')].map((slot: string, index: number) => {
                    const parsedSlot = toZonedTime(slot, selectedTimezone);

                    if (isPast(parsedSlot)) {
                      return;
                    }

                    return (
                      <Button
                        fullWidth
                        key={index}
                        onClick={() => {
                          setSelectedTimeSlot(slot);
                          setOpenBookingForm(true);
                        }}
                      >
                        {
                          formatInTimeZone(slot, selectedTimezone, is24Hours ? DateFnsFormat.TIME24 : DateFnsFormat.TIME12, {
                            locale: dateFnsLocale,
                          })
                        }
                      </Button>
                    );
                  })}
                </Stack>
              </ScrollArea>
            </Flex>
          )
        }
      </SimpleGrid>
    </Container>
  );
}

export default Book;
