import React, {useState} from 'react';
import {
  Avatar,
  Badge,
  Button,
  Container,
  Flex,
  Group,
  ScrollArea,
  SegmentedControl,
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
import TimezoneSelector from '@/components/TimezoneSelector';
import EventBookingForm from '@/components/Forms/EventBookingForm';
import {formatInTimeZone, toZonedTime} from "date-fns-tz";
import {DateFnsFormat} from "@/enums/Time";
import {ar} from "date-fns/locale";

function BookNew(props) {
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

  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();

  return (
    <div>
      <Container
        pt={88}
        size="lg"
        style={{
          minHeight: 'calc(100vh - 100px)',
        }}
      >
        {
          !props.host.data.settings.allowSeoIndexing ? (
            <Head>
              <title>{props.event.data.name}</title>
              <meta name="robots" content="noindex, nofollow"/>
              <meta name="googlebot" content="noindex"/>
              <meta name="googlebot-news" content="nosnippet"/>
            </Head>
          ) : <Head title={props.event.data.name}/>
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
              <Tooltip label={props.host.data.name}>
                <Avatar
                  href={props.host.data.link}
                  component={InertiaLink}
                  src={props.host.data.avatar}
                  alt={props.host.data.name}
                />
              </Tooltip>
            </Group>

            <Text>
              {props.host.data.name}
            </Text>

            <Title mt={22} size="md">{props.event.data.name}</Title>
            <Text>{props.event.data.description}</Text>

            <Badge variant="light" color="gray">
              <Tooltip label="مدة الاجتماع">
                <Flex align="center" gap={4}>
                  <BiTime size={17}/>
                  <Text size="sm" mt={3}>
                    {props.event.data.duration}
                    {' '}
                    دقيقة
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
                  maxDate={props.event.data.maxFutureBookingDate ? dayjs(props.event.data.maxFutureBookingDate).toDate() : null}
                  selectedDate={selectedDate}
                  selectedMonth={selectedMonth}
                  isLoading={isLoadingAvailabilitiesForDay}
                  onMonthChange={(n) => {
                    setSelectedMonth(n);
                    Inertia.visit(`/${props.host.data.username}/${props.event.data.slug}?month=${format(n, 'yyy-MM')}`, {
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
                <Group px={22}>
                  <SegmentedControl
                    value={is24Hours ? '24' : '12'}
                    onChange={(value) => setIs24Hours(value === '24')}
                    data={[
                      {label: '24 س', value: '24'},
                      {label: 'ص/م', value: '12'},
                    ]}
                  />
                </Group>

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
                              locale: ar,
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
    </div>
  );
}

export default BookNew;
