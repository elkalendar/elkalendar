import {
  ActionIcon,
  Badge,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme
} from "@mantine/core";
import {format} from "date-fns";
import {convertTimeslotToTime} from "@/utils/DateTimeHelpers";
import {DateFnsFormat} from "@/enums/Time";
import {FaGlobe} from "react-icons/fa";
import {InertiaLink} from "@inertiajs/inertia-react";
import {BiEdit} from "react-icons/bi";
import {BsTrash} from "react-icons/bs";
import React from "react";
import {Schedule} from "@/types/entities";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import {Inertia} from "@inertiajs/inertia";
import {useTranslation} from "react-i18next";
import {modals} from "@mantine/modals";

interface Props {
  schedule: Schedule;
}

export const ScheduleCard = (props: Props) => {
  const {t} = useTranslation();
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();
  const dateFnsLocale = useDateFnsLocale();

  const deleteSchedule = (id: string) => {
    Inertia.delete(`/availability/${id}`);
  };

  const confirmModal = (id: string) => modals.openConfirmModal({
    title: t('availability.delete_confirm'),
    children: (
      ''
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onConfirm: () => deleteSchedule(id),
  });

  return (
    <Flex
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
              {props.schedule.name}
            </Title>
            {props.schedule.isDefault && (
              <Badge color="blue">
                {t('availability.default_schedule')}
              </Badge>
            )}
          </Group>

          <Stack gap={0}>
            {
              Object.keys(props.schedule.intervals).map((day: string, index) => (
                <Flex key={index}>
                  <Group w={150} miw={80}>
                    {t('days.' + day)}
                  </Group>

                  {
                    props.schedule.intervals[day].length === 0 && <Text size="sm">
                      {t('availability.no_interval')}
                    </Text>
                  }

                  {props.schedule.intervals[day].map((interval, index) => (
                    <Group key={index}>
                      <Text size="sm">
                        {format(convertTimeslotToTime(interval.from), DateFnsFormat.TIME12, {locale: dateFnsLocale,})}
                      </Text>
                      <span className="mx-1">-</span>
                      <Text size="sm">
                        {format(convertTimeslotToTime(interval.to), DateFnsFormat.TIME12, {locale: dateFnsLocale,})}
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
              {props.schedule.timezone}
            </Text>
          </Flex>
        </Flex>

        <Flex
          gap={8}
        >
          <Tooltip label={t('availability.edit')}>
            <ActionIcon
              component={InertiaLink}
              href={`/availability/${props.schedule.id}`}
              size='lg'
              variant='subtle'
            >
              <BiEdit/>
            </ActionIcon>
          </Tooltip>
          <Tooltip label={t('availability.delete')}>
            <ActionIcon
              color="red"
              onClick={() => confirmModal(props.schedule.id)}
              size='lg'
              variant='subtle'
            >
              <BsTrash/>
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Group>
    </Flex>
  );
};
