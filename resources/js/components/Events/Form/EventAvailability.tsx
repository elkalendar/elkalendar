import React from 'react';
import {Button, Flex, Group, Select, Text,} from '@mantine/core';
import {format} from 'date-fns';
import {ar} from 'date-fns/locale';
import {BsGlobe2} from 'react-icons/bs';
import {InertiaLink, useForm} from '@inertiajs/inertia-react';
import {FiExternalLink} from 'react-icons/fi';
import {Inertia} from '@inertiajs/inertia';
import {showSuccessToast} from '@/utils/FormHelpers';
import {getArabicWeekday} from '@/utils/WeekdaysHelpers';
import {convertTimeslotToTime, getUserTimeFormat} from '@/utils/DateTimeHelpers';
import useTypedPage from '@/hooks/useTypedPage';
import {Event} from '@/types/entities';

interface EventAvailabilityProps {
  event: Event;
  form: any;
}

export default function (props: EventAvailabilityProps) {
  const page = useTypedPage();
  const form = useForm({
    scheduleId: props.event.scheduleId,
  });

  return (
    <Flex direction="column" gap={22}>
      <Select
        allowDeselect={false}
        label="جدول المواعيد"
        description="اختر جدول المواعيد الذي تريد استخدامه لهذا الاجتماع"
        placeholder="اختر جدول المواعيد"
        data={page.props.schedules.data.map((schedule: any) => ({
          value: schedule.id,
          label: schedule.name,
          disabled: schedule.id === props.event.scheduleId,
        }))}
        defaultValue={form.data.scheduleId ?? page.props.schedules.data[0].id}
        onChange={(e) => {
          Inertia.put(`/events/${props.event.id}/update-schedule`, {
            scheduleId: e,
          }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
              showSuccessToast('تم تعديل جدول المواعيد بنجاح');
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
          <Text size="sm">{page.props.event.data.schedule.timezone}</Text>
        </Flex>
        <Button
          target="_blank"
          variant="subtle"
          size="sm"
          component={InertiaLink}
          href={`/availability/${props.event.scheduleId}`}
          leftSection={<FiExternalLink/>}
        >
          تعديل جدول المواعيد
        </Button>
      </Flex>

      <Flex
        justify="space-between"
        align="start"
        direction="column"
      >
        {
          Object.keys(page.props.event.data.schedule.intervals).map((weekday: any, index) => (
            <Flex
              key={index}
              justify="space-between"
              align="center"
              gap={22}
              p={12}
            >
              <Group w={52}>{getArabicWeekday(weekday)}</Group>
              <Flex>
                {page.props.event.data.schedule.intervals[weekday].length < 1 &&
                  <Text size="sm">لا يوجد مواعيد</Text>}

                {
                  page.props.event.data.schedule.intervals[weekday].map((interval: any, index: number) => (
                    <Flex
                      align="center"
                      gap={8}
                      key={index}
                    >
                      <div className="interval-start">
                        {format(convertTimeslotToTime(interval.from), getUserTimeFormat(page.props.auth.user.data.timeFormat), {
                          locale: ar,
                        })}
                      </div>
                      <div className="interval-separator mx-2">-</div>
                      <div className="interval-end">
                        {format(convertTimeslotToTime(interval.to), getUserTimeFormat(page.props.auth.user.data.timeFormat), {
                          locale: ar,
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
