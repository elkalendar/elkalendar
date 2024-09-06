import React from 'react';
import {Button, Flex, Group, Select, Text,} from '@mantine/core';
import {format} from 'date-fns';
import {BsGlobe2} from 'react-icons/bs';
import {InertiaLink, useForm} from '@inertiajs/inertia-react';
import {FiExternalLink} from 'react-icons/fi';
import {Inertia} from '@inertiajs/inertia';
import {convertTimeslotToTime, getUserTimeFormat} from '@/utils/DateTimeHelpers';
import useTypedPage from '@/hooks/useTypedPage';
import {Event, Schedule} from '@/types/entities';
import {useTranslation} from "react-i18next";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import useSuccessToast from "@/hooks/useSuccessToast";

interface EventAvailabilityProps {
  schedules: Schedule[];
  event: Event;
}

export default function (props: EventAvailabilityProps) {
  const successToast = useSuccessToast();
  const {t} = useTranslation();
  const page = useTypedPage();
  const dateFnsLocale = useDateFnsLocale();
  const form = useForm({
    scheduleId: props.event.scheduleId,
  });

  return (
    <Flex direction="column" gap={22}>
      <Select
        allowDeselect={false}
        label={t('forms.event.availability.schedule_title')}
        description={t('forms.event.availability.schedule_description')}
        placeholder={t('forms.event.availability.schedule_placeholder')}
        data={props.schedules.map((schedule: any) => ({
          value: schedule.id,
          label: schedule.name,
          disabled: schedule.id === props.event.scheduleId,
        }))}
        defaultValue={form.data.scheduleId ?? props.schedules[0].id}
        onChange={(e) => {
          Inertia.put(`/events/${props.event.id}/update-schedule`, {
            scheduleId: e,
          }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
              successToast();
            },
          });
        }}
      />

      <Flex
        justify="space-between"
        align="center"
      >
        <Flex
          align="center"
          gap={8}
        >
          <BsGlobe2 size={14}/>
          <Text size="sm">{props.event.schedule.timezone}</Text>
        </Flex>
        <Button
          target="_blank"
          variant="subtle"
          size="sm"
          component={InertiaLink}
          href={`/availability/${props.event.scheduleId}`}
          leftSection={<FiExternalLink/>}
        >
          {t('availability.edit_schedule')}
        </Button>
      </Flex>

      <Flex
        justify="space-between"
        align="start"
        direction="column"
      >
        {
          Object.keys(props.event.schedule.intervals).map((weekday: any, index) => (
            <Flex
              key={index}
              justify="space-between"
              align="center"
              gap={22}
              p={12}
            >
              <Group w={150}>{t('days.' + weekday)}</Group>
              <Flex>
                {props.event.schedule.intervals[weekday].length < 1 &&
                  <Text size="sm">
                    {t('availability.no_interval')}
                  </Text>}

                {
                  props.event.schedule.intervals[weekday].map((interval: any, index: number) => (
                    <Flex
                      align="center"
                      gap={8}
                      key={index}
                    >
                      <div className="interval-start">
                        {format(convertTimeslotToTime(interval.from), getUserTimeFormat(page.props.auth.user.timeFormat), {
                          locale: dateFnsLocale,
                        })}
                      </div>
                      <div className="interval-separator mx-2">-</div>
                      <div className="interval-end">
                        {format(convertTimeslotToTime(interval.to), getUserTimeFormat(page.props.auth.user.timeFormat), {
                          locale: dateFnsLocale,
                        })}
                      </div>
                    </Flex>
                  ))
                }
              </Flex>
            </Flex>
          ))
        }
      </Flex>
    </Flex>
  );
}
