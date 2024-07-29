import React, {useEffect, useState} from 'react';
import {FaGlobe, FaSave} from 'react-icons/fa';
import {
  ActionIcon,
  Alert,
  Badge,
  Button,
  Flex,
  Group,
  Input,
  Modal,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import {BiEdit, BiPlus, BiSolidError} from 'react-icons/bi';
import {BsTrash} from 'react-icons/bs';
import {Inertia} from '@inertiajs/inertia';
import {ar} from 'date-fns/locale';
import {format} from 'date-fns';
import {InertiaLink, useForm} from '@inertiajs/inertia-react';
import {getArabicWeekday} from '@/utils/WeekdaysHelpers';
import {Schedule} from '@/types/entities';
import useTypedPage from '@/hooks/useTypedPage';
import PageHeader from '@/components/PageHeader/PageHeader';
import AppLayout from '@/layouts/AppLayout';
import {convertTimeslotToTime} from '@/utils/DateTimeHelpers';
import {DateFnsFormat} from '@/enums/Time';

interface AvailabilityProps {
  schedules: {
    data: Schedule[];
  };
}

export default function Index(props: AvailabilityProps) {
  const page = useTypedPage();
  const [createNewModalOpen, setCreateNewModalOpen] = useState(false);
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();

  const headerAction = (
    <Button
      leftSection={<BiPlus/>}
      component="button"
      type="button"
      onClick={() => {
        setCreateNewModalOpen(true);
      }}
    >
      جدول جديد
    </Button>
  );

  const form = useForm({
    name: '',
  });

  const deleteSchedule = (id: string) => {
    Inertia.delete(`/availability/${id}`);
  };

  return (
    <AppLayout
      title="جدول المواعيد"
      renderHeader={() => (
        <PageHeader
          title="جدول المواعيد"
          subtitle="قم بتخصيص الأوقات التي تكون فيها متاحًا للحجوزات."
          leftSection={headerAction}
        />
      )}
    >
      <Modal
        centered
        opened={createNewModalOpen}
        onClose={() => setCreateNewModalOpen(false)}
        title="إضافة جدول زمني جديد"
      >
        <Flex
          direction="column"
          gap={22}
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

          <div className="actions">
            <Button
              type="submit"
              onClick={() => {
                form.post('/availability', {
                  preserveScroll: true,
                  data: form.data,
                  onSuccess: () => {
                    setCreateNewModalOpen(false);
                  },
                });
              }}
              leftSection={<FaSave/>}
            >
              حفظ
            </Button>
          </div>
        </Flex>
      </Modal>

      <Flex direction="column">
        {
          page.props.errors?.scheduleError && <Alert
            title='خطأ'
            color='red'
            icon={<BiSolidError/>}
            mb={22}
          >
            {page.props.errors.scheduleError}
          </Alert>
        }

        {
          props.schedules.data.map((schedule, index) => (
            <Flex
              key={index}
              direction="column"
              mb={12}
              p={12}
              style={{
                borderRadius: '8px',
                backgroundColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[2],
                hover: {
                  backgroundColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[1],
                },
              }}
            >
              <Group justify="space-between">
                <Flex direction="column">
                  <Group mb={22}>
                    <Title size="md">
                      {schedule.name}
                    </Title>
                    {schedule.isDefault && (
                      <Badge color="blue">
                        جدول المواعيد الافتراضي
                      </Badge>
                    )}
                  </Group>

                  <Stack gap={0}>
                    {
                      Object.keys(schedule.intervals).map((day, index) => (
                        <Flex key={index}>
                          <Group miw={80}>
                            {getArabicWeekday(day)}
                          </Group>

                          {
                            schedule.intervals[day].length === 0 && <Text size="sm">لا يوجد مواعيد</Text>
                          }

                          {schedule.intervals[day].map((interval, index) => (
                            <Group key={index}>
                              <Text size="sm">
                                {format(convertTimeslotToTime(interval.from), DateFnsFormat.TIME12, {locale: ar})}
                              </Text>
                              <span className="mx-1">-</span>
                              <Text size="sm">
                                {format(convertTimeslotToTime(interval.to), DateFnsFormat.TIME12, {locale: ar})}
                              </Text>
                            </Group>
                          ))}
                        </Flex>
                      ))
                    }
                  </Stack>

                  <Flex align="center" gap={6} mt={22}>
                    <FaGlobe/>
                    <Text size="sm" mt={4}>
                      {schedule.timezone}
                    </Text>
                  </Flex>
                </Flex>

                <Flex
                  gap={8}
                >
                  <Tooltip label="تعديل">
                    <ActionIcon
                      component={InertiaLink}
                      href={`/availability/${schedule.id}`}
                      size='lg'
                      variant='subtle'
                    >
                      <BiEdit/>
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label='حذف'>
                    <ActionIcon
                      color="red"
                      onClick={() => {
                        if (confirm('هل أنت متأكد من حذف هذا الجدول؟')) {
                          deleteSchedule(schedule.id);
                        }
                      }}
                      size='lg'
                      variant='subtle'
                    >
                      <BsTrash/>
                    </ActionIcon>
                  </Tooltip>
                </Flex>
              </Group>
            </Flex>
          ))
        }
      </Flex>
    </AppLayout>
  );
}
