import React from 'react';
import {
  ActionIcon,
  Center,
  Group,
  Menu,
  Stack,
  Text,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import {BiCopy, BiDotsHorizontalRounded, BiLinkExternal} from 'react-icons/bi';
import {FaClock, FaEdit} from 'react-icons/fa';
import {FaX} from 'react-icons/fa6';
import {InertiaLink} from '@inertiajs/inertia-react';
import {useClipboard} from '@mantine/hooks';
import {Inertia} from '@inertiajs/inertia';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import {modals} from '@mantine/modals';
import useTypedPage from '@/hooks/useTypedPage';
import {showSuccessToast} from '@/utils/FormHelpers';
import {Event} from '@/types/entities';

interface EventRowProps {
  event: Event;
}

function EventRow(props: EventRowProps) {
  const clipboard = useClipboard();
  const page = useTypedPage();
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();

  const openDeleteModal = () => modals.openConfirmModal({
    centered: true,
    children: <Text size="sm">
      لن يتمكن أي شخص شاركت هذا الاجتماع معه من الحجز باستخدامه بعد الآن.
    </Text>,
    confirmProps: {
      color: 'red',
    },
    labels: {
      cancel: 'الغاء',
      confirm: 'تأكيد الحذف',
    },
    onConfirm: () => {
      Inertia.delete(`/events/${props.event.id}`, {
        preserveScroll: true,
        onSuccess: () => {
          showSuccessToast('تم حذف الاجتماع بنجاح');
        },
      });
    },
    title: 'حذف الاجتماع',
  });

  return (
    <Group
      justify="space-between"
      mb={10}
      p={12}
      style={{
        border: '1px solid #e3e3e3',
        borderRadius: '8px',
        backgroundColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[2],
        borderColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[4],
        borderRightWidth: '4px',
        borderRightColor: props.event.color,
      }}
    >
      <Stack gap={12}>
        <Text size="md">
          {props.event.name}
        </Text>
        <Text size="sm">
          https://elkalendar.com/
          {page.props.auth.user.data.username}
          /
          {props.event.slug}
        </Text>
        <Group>
          <Center inline>
            <FaClock size="0.8rem"/>
            <Text px={6} size="sm">
              {props.event.duration}
              {' '}
              دقيقة
            </Text>
          </Center>
        </Group>
        <Text size="sm">
          {props.event.visible ? (
            <>
              <AiOutlineEye size="0.9rem"/>
              <Text component='span' px={6} size="sm">مرئي للجميع</Text>
            </>
          ) : (
            <>
              <AiOutlineEyeInvisible size="0.9rem"/>
              <Text component='span' px={6} size="sm">سري</Text>
            </>
          )}
        </Text>
      </Stack>
      <ActionIcon.Group>
        <Tooltip label="معاينة">
          <ActionIcon
            variant="outline"
            size="lg"
            component="a"
            href={props.event.link}
            target="_blank"
          >
            <BiLinkExternal/>
          </ActionIcon>
        </Tooltip>

        <Tooltip label="نسخ رابط الاجتماع">
          <ActionIcon
            variant="outline"
            size="lg"
            onClick={() => {
              clipboard.copy(props.event.link);
              showSuccessToast('تم نسخ الرابط بنجاح');
            }}
          >
            <BiCopy/>
          </ActionIcon>
        </Tooltip>

        <Menu shadow="md">
          <Menu.Target>
            <ActionIcon variant="outline" size="lg">
              <BiDotsHorizontalRounded/>
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              component={InertiaLink}
              href={`/events/${props.event.id}/edit`}
              leftSection={<FaEdit/>}
            >
              تعديل
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item
              leftSection={<FaX/>}
              color="red"
              onClick={openDeleteModal}
            >
              حذف
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </ActionIcon.Group>
    </Group>
  );
}

export default EventRow;
