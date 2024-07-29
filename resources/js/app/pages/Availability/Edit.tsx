import React from 'react';
import {
  Button, Flex, Group, Input, Select, Switch,
  useMantineColorScheme, useMantineTheme,
} from '@mantine/core';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import { FaSave } from 'react-icons/fa';
import dayjs from 'dayjs';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import AppLayout from '@/layouts/AppLayout';
import PageHeader from '@/components/PageHeader/PageHeader';
import useTypedPage from '@/hooks/useTypedPage';
import { Schedule } from '@/types/entities';
import weekdays, { getArabicWeekday } from '@/utils/WeekdaysHelpers';
import { convertTimeslotToTime, getUserTimeFormat } from '@/utils/DateTimeHelpers';
import { DefaultInterval } from '@/enums/Time';
import { showSuccessToast } from '@/utils/FormHelpers';
import BackButton from '@/components/BackButton';
import TimezoneSelector from '@/components/TimezoneSelector';

interface EditScheduleProps {
  schedule: {
    data: Schedule;
  };
  timezones: any;
}

export default function Edit(props: EditScheduleProps) {
  const page = useTypedPage();

  const form = useForm({
    name: page.props.schedule.data.name,
    timezone: page.props.schedule.data.timezone,
    isDefault: page.props.schedule.data.isDefault,
  });

  const isDayActive = (day: string) => Object.keys(props.schedule.data.intervals).includes(day) && props.schedule.data.intervals[day].length > 0;

  const getDayIntervals = (day: string) => props.schedule.data.intervals[day];

  const generateTimeSlots = () => {
    const timeSlots = [];
    const startTime = new Date();
    startTime.setHours(0, 0, 0, 0); // Set start time to midnight

    // Create a loop to generate time slots
    for (let i = 0; i < 96; i++) { // 96 slots for 24 hours (60 minutes / 15-minute intervals)
      const timeSlot = new Date(startTime.getTime() + i * 15 * 60 * 1000); // Add 15 minutes in milliseconds
      timeSlots.push(dayjs(timeSlot).format('HH:mm'));
    }

    return timeSlots;
  };

  const handleDaySwitch = (day: string) => {
    if (isDayActive(day)) {
      Inertia.post(`/availability/${props.schedule.data.id}/remove-day`, {
        day,
      }, {
        preserveScroll: true,
        onSuccess: () => showSuccessToast(),
      });
      return;
    }

    Inertia.post(`/availability/${props.schedule.data.id}/add-day`, {
      day,
    }, {
      preserveScroll: true,
      onSuccess: () => showSuccessToast(),
    });
  };
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();

  const handleUpdate = () => {
    form.post(`/availability/${props.schedule.data.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        form.setDefaults()
        showSuccessToast();
      },
    });
  }

  return (
    <AppLayout
      title={`تعديل: ${props.schedule.data.name}`}
      renderHeader={() => (
        <PageHeader
          title={`تعديل: ${props.schedule.data.name}`}
          rightSection={<BackButton href="/availability" />}
        />
      )}
    >

      <Flex
        direction="column"
        gap={22}
        p={22}
        style={{
          border: '1px solid #e3e3e3',
          borderRadius: '8px',
          backgroundColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[2],
          borderColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[4],
        }}
      >
        <Input.Wrapper
          withAsterisk
          label="الاسم"
          error={form.errors.name}
        >
          <Input
            value={form.data.name}
            onChange={(e) => form.setData('name', e.currentTarget.value)}
          />
        </Input.Wrapper>

        <TimezoneSelector
          is24Hours={false}
          defaultTimezone={form.data.timezone}
          selectedTimezone={form.data.timezone}
          timezones={props.timezones}
          onChange={(timezone) => {
            form.setData('timezone', timezone);
          }}
        />

        <Switch
          description={props.schedule.data.isDefault ? 'لا يمكنك الغاء جدول المواعيد الافتراضي' : ''}
          disabled={props.schedule.data.isDefault}
          label="جدول المواعيد الافتراضي"
          checked={form.data.isDefault}
          onChange={() => {
            form.setData('isDefault', !form.data.isDefault);
          }}
        />

        <Group>
          <Button
            leftSection={<FaSave />}
            loading={form.processing}
            disabled={!form.isDirty || form.processing}
            onClick={() => handleUpdate()}
          >
            حفظ
          </Button>
        </Group>
      </Flex>
      <Flex
        direction="column"
        gap={12}
        mt={32}
        p={22}
        style={{
          border: '1px solid #e3e3e3',
          borderRadius: '8px',
          backgroundColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[2],
          borderColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[4],
        }}
      >
        {
          weekdays.map((day, index) => (
            <Flex align="center" key={index} gap={32}>
              <Switch
                w={100}
                label={getArabicWeekday(day)}
                checked={isDayActive(day)}
                onChange={() => handleDaySwitch(day)}
              />

              <Flex>
                {
                  isDayActive(day) && getDayIntervals(day).map((interval, index: number) => (
                    <Flex align="center" gap={12} key={index}>
                      <Select
                        checkIconPosition="right"
                        maxDropdownHeight={200}
                        defaultValue={dayjs(convertTimeslotToTime(DefaultInterval.FROM)).format('HH:mm')}
                        value={interval.from}
                        data={generateTimeSlots().map((timeSlot) => ({
                          label: format(convertTimeslotToTime(timeSlot), getUserTimeFormat(page.props.auth.user.data.timeFormat), { locale: ar }),
                          value: timeSlot,
                        }))}
                        onChange={(e) => {
                          Inertia.post(`/availability/${props.schedule.data.id}/update-interval`, {
                            day,
                            from: e,
                            to: interval.to,
                          }, {
                            preserveScroll: true,
                            onSuccess: () => showSuccessToast(),
                          });
                        }}
                      />

                      -

                      <Select
                        checkIconPosition="right"
                        maxDropdownHeight={200}
                        defaultValue={dayjs(convertTimeslotToTime(DefaultInterval.TO)).format('HH:mm')}
                        value={interval.to}
                        data={generateTimeSlots().map((timeSlot) => ({
                          label: format(convertTimeslotToTime(timeSlot), getUserTimeFormat(page.props.auth.user.data.timeFormat), { locale: ar }),
                          value: timeSlot,
                        }))}
                        onChange={(e) => {
                          Inertia.post(`/availability/${props.schedule.data.id}/update-interval`, {
                            day,
                            from: interval.from,
                            to: e,
                          }, {
                            preserveScroll: true,
                            onSuccess: () => showSuccessToast(),
                          });
                        }}
                      />
                    </Flex>
                  ))
                }
              </Flex>
            </Flex>
          ))
        }
      </Flex>
    </AppLayout>
  );
}
