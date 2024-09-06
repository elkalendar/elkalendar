import React from 'react';
import {InertiaLink} from '@inertiajs/inertia-react';
import {Button, Flex, Group, Paper, SimpleGrid, Text, useDirection} from '@mantine/core';
import {BsCalendar, BsCalendar3, BsFillCalendarEventFill, BsFillCalendarWeekFill} from 'react-icons/bs';
import AppLayout from '@/layouts/AppLayout';
import PageHeader from '@/components/PageHeader/PageHeader';
import NoResults from '@/components/NoResults/NoResults';
import BookingsList from '@/components/Booking/BookingList';
import {Booking} from "@/types/entities";
import {useTranslation} from "react-i18next";

interface DashboardProps {
  bookingsToday: number;
  bookingsNextWeek: number;
  bookingsNextMonth: number;
  bookings: Booking[];
}

export default (props: DashboardProps) => {
  const {t} = useTranslation();
  const direction = useDirection();

  const paperIconStyle = direction.dir === 'ltr' ? {
    position: 'absolute',
    right: '20px'
  } : {
    position: 'absolute',
    left: '20px'
  };

  return (
    <AppLayout
      title="لوحة التحكم"
      renderHeader={() => (
        <PageHeader
          title={t('dashboard.greeting')}
        />
      )}
    >
      <div>
        <SimpleGrid cols={{
          base: 1,
          sm: 2,
          md: 3,
        }} mb={44}>
          <Paper withBorder p="md" pos='relative' radius="md">
            <BsFillCalendarEventFill
              style={paperIconStyle}
              size="1.5rem"
            />
            <Group justify="apart">
              <div>
                <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
                  {t('dashboard.bookings.today')}
                </Text>
                <Text fw={700} fz="xl">
                  {props.bookingsToday === 0 ? t('dashboard.bookings.none') : props.bookingsToday}
                </Text>
              </div>
            </Group>
          </Paper>
          <Paper withBorder p="md" pos='relative' radius="md">
            <BsFillCalendarWeekFill
              style={paperIconStyle}
              size="1.5rem"
            />
            <Group justify="apart">
              <div>
                <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
                  {t('dashboard.bookings.next_week')}
                </Text>
                <Text fw={700} fz="xl">
                  {props.bookingsNextWeek === 0 ? t('dashboard.bookings.none') : props.bookingsNextWeek}
                </Text>
              </div>
            </Group>
          </Paper>
          <Paper withBorder p="md" pos='relative' radius="md">
            <BsCalendar3
              style={paperIconStyle}
              size="1.5rem"
            />
            <Group justify="apart">
              <div>
                <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
                  {t('dashboard.bookings.month')}
                </Text>
                <Text fw={700} fz="xl">
                  {props.bookingsNextMonth === 0 ? t('dashboard.bookings.none') : props.bookingsNextMonth}
                </Text>
              </div>
            </Group>
          </Paper>
        </SimpleGrid>

        <Flex justify="space-between" mb={22} align='center'>
          <Text size="sm">
            {t('dashboard.bookings.incoming')}
          </Text>
          <Button
            component={InertiaLink}
            href="/bookings"
            variant="subtle"
          >
            {t('dashboard.bookings.show_all')}
          </Button>
        </Flex>

        {
          props.bookings.length < 1 ? (
            <NoResults
              title={t('bookings.no_bookings')}
              subtitle={t('bookings.no_bookings_desc')}
              icon={<BsCalendar size="3rem"/>}
            />
          ) : <BookingsList hasPagination={false} bookings={{data: props.bookings}}/>
        }

      </div>
    </AppLayout>
  );
}
