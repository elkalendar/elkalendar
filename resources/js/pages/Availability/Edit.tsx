import React from 'react';
import {
  Button, Flex, Group, Input, Select, Switch,
  useMantineColorScheme, useMantineTheme,
} from '@mantine/core';
import {Inertia} from '@inertiajs/inertia';
import {useForm} from '@inertiajs/inertia-react';
import {FaSave} from 'react-icons/fa';
import dayjs from 'dayjs';
import {format} from 'date-fns';
import AppLayout from '@/layouts/AppLayout';
import PageHeader from '@/components/PageHeader/PageHeader';
import useTypedPage from '@/hooks/useTypedPage';
import {Schedule} from '@/types/entities';
import weekdays from '@/utils/WeekdaysHelpers';
import {convertTimeslotToTime, getUserTimeFormat} from '@/utils/DateTimeHelpers';
import {DefaultInterval} from '@/enums/Time';
import BackButton from '@/components/BackButton';
import TimezoneSelector from '@/components/TimezoneSelector';
import {useTranslation} from "react-i18next";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import useSuccessToast from "@/hooks/useSuccessToast";

interface EditScheduleProps {
  schedule: Schedule;
  timezones: any;
}

export default function Edit(props: EditScheduleProps) {
  const successToast = useSuccessToast();
  const {t} = useTranslation();
  const page = useTypedPage();
  const dateFnsLocale = useDateFnsLocale();

  const form = useForm({
    name: props.schedule.name,
    timezone: props.schedule.timezone,
    isDefault: props.schedule.isDefault,
  });

  const isDayActive = (day: string) => Object.keys(props.schedule.intervals).includes(day) && props.schedule.intervals[day].length > 0;

  const getDayIntervals = (day: string) => props.schedule.intervals[day];

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
      Inertia.post(`/availability/${props.schedule.id}/remove-day`, {
        day,
      }, {
        preserveScroll: true,
        onSuccess: () => successToast(),
      });
      return;
    }

    Inertia.post(`/availability/${props.schedule.id}/add-day`, {
      day,
    }, {
      preserveScroll: true,
      onSuccess: () => successToast(),
    });
  };
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();

  const handleUpdate = () => {
    form.post(`/availability/${props.schedule.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        form.setDefaults()
        successToast();
      },
    });
  }

  return (
    <AppLayout
      title={t('availability.edit_title') + ` ${props.schedule.name}`}
      renderHeader={() => (
        <PageHeader
          title={t('availability.edit_title') + ` ${props.schedule.name}`}
          rightSection={<BackButton href="/availability"/>}
        />
      )}
    >
      <>
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
            label={t('forms.event.availability.name')}
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
            description={props.schedule.isDefault ? t('availability.cannot_delete_default') : ''}
            disabled={props.schedule.isDefault}
            label={t('availability.default_schedule')}
            checked={form.data.isDefault}
            onChange={() => {
              form.setData('isDefault', !form.data.isDefault);
            }}
          />

          <Group>
            <Button
              leftSection={<FaSave/>}
              loading={form.processing}
              disabled={!form.isDirty || form.processing}
              onClick={() => handleUpdate()}
            >
              {t('btn.save')}
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
                  label={t('days.' + day)}
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
                            label: format(convertTimeslotToTime(timeSlot), getUserTimeFormat(page.props.auth.user.timeFormat), {locale: dateFnsLocale,}),
                            value: timeSlot,
                          }))}
                          onChange={(e) => {
                            Inertia.post(`/availability/${props.schedule.id}/update-interval`, {
                              day,
                              from: e,
                              to: interval.to,
                            }, {
                              preserveScroll: true,
                              onSuccess: () => successToast(),
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
                            label: format(convertTimeslotToTime(timeSlot), getUserTimeFormat(page.props.auth.user.timeFormat), {locale: dateFnsLocale,}),
                            value: timeSlot,
                          }))}
                          onChange={(e) => {
                            Inertia.post(`/availability/${props.schedule.id}/update-interval`, {
                              day,
                              from: interval.from,
                              to: e,
                            }, {
                              preserveScroll: true,
                              onSuccess: () => successToast(),
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
      </>
    </AppLayout>
  );
}
