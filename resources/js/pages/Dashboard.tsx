import React from 'react';
import {InertiaLink} from '@inertiajs/inertia-react';
import {Button, Flex, Group, Paper, SimpleGrid, Text} from '@mantine/core';
import {BsCalendar, BsCalendar3, BsFillCalendarEventFill, BsFillCalendarWeekFill} from 'react-icons/bs';
import AppLayout from '@/layouts/AppLayout';
import PageHeader from '@/components/PageHeader/PageHeader';
import NoResults from '@/components/NoResults/NoResults';
import BookingTable from '@/components/Booking/BookingList';
import {Booking} from "@/types/entities";

interface DashboardProps {
  bookingsToday: number;
  bookingsNextWeek: number;
  bookingsNextMonth: number;
  bookings: {
    data: Booking[];
  };
}

export default (props: DashboardProps) => {
  return (
    <AppLayout
      title="لوحة التحكم"
      renderHeader={() => (
        <PageHeader
          title="مرحبا بك في لوحة التحكم"
        />
      )}
    >
      <div>
        <SimpleGrid cols={{
          base: 1,
          sm: 2,
          md: 3,
        }} mb={44}>
          <Paper withBorder p="md" pos='relative' radius="md" key='123'>
            <BsFillCalendarEventFill
              style={{
                position: 'absolute',
                left: '20px'
              }}
              size="1.5rem"
            />
            <Group justify="apart">
              <div>
                <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
                  حجوزات اليوم
                </Text>
                <Text fw={700} fz="xl">
                  {props.bookingsToday === 0 ? 'لا يوجد' : props.bookingsToday}
                </Text>
              </div>
            </Group>
          </Paper>
          <Paper withBorder p="md" pos='relative' radius="md" key='123'>
            <BsFillCalendarWeekFill
              style={{
                position: 'absolute',
                left: '20px'
              }}
              size="1.5rem"
            />
            <Group justify="apart">
              <div>
                <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
                  حجوزات السبع ايام المقبلة
                </Text>
                <Text fw={700} fz="xl">
                  {props.bookingsNextWeek === 0 ? 'لا يوجد' : props.bookingsNextWeek}
                </Text>
              </div>
            </Group>
          </Paper>
          <Paper withBorder p="md" pos='relative' radius="md" key='123'>
            <BsCalendar3
              style={{
                position: 'absolute',
                left: '20px'
              }}
              size="1.5rem"
            />
            <Group justify="apart">
              <div>
                <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
                  حجوزات الثلاثين يوم المقبلة
                </Text>
                <Text fw={700} fz="xl">
                  {props.bookingsNextMonth === 0 ? 'لا يوجد' : props.bookingsNextMonth}
                </Text>
              </div>
            </Group>
          </Paper>
        </SimpleGrid>

        <Flex justify="space-between" mb={22}>
          <Text size="sm">
            الحجوزات القادمة
          </Text>
          <Button
            component={InertiaLink}
            href="/bookings"
            variant="subtle"
          >
            عرض جميع الحجوزات
          </Button>
        </Flex>

        {
          props.bookings.data.length < 1 ? (
            <NoResults
              title="لا يوجد حجوزات"
              subtitle="ليس لديك أي حجوزات قادمة. بمجرد قيام شخص ما بحجز موعد معك، سيظهر هنا."
              icon={<BsCalendar size="3rem"/>}
            />
          ) : <BookingTable bookings={props.bookings}/>
        }

      </div>
    </AppLayout>
  );
}
