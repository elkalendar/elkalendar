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
import {BiCopy, BiDotsHorizontalRounded, BiDuplicate, BiLinkExternal} from 'react-icons/bi';
import {FaClock, FaCopy, FaEdit} from 'react-icons/fa';
import {FaX} from 'react-icons/fa6';
import {InertiaLink} from '@inertiajs/inertia-react';
import {useClipboard} from '@mantine/hooks';
import {Inertia} from '@inertiajs/inertia';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import {modals} from '@mantine/modals';
import useTypedPage from '@/hooks/useTypedPage';
import {Event} from '@/types/entities';
import {useTranslation} from "react-i18next";
import useSuccessToast from "@/hooks/useSuccessToast";

interface EventRowProps {
  event: Event;
}

export default (props: EventRowProps) => {
  const successToast = useSuccessToast();
  const {t} = useTranslation();
  const clipboard = useClipboard();
  const page = useTypedPage();
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();

  const openDeleteModal = () => modals.openConfirmModal({
    centered: true,
    children: <Text size="sm">{t('modals.event.delete_desc')}</Text>,
    confirmProps: {
      color: 'red',
    },
    labels: {
      cancel: t('btn.cancel'),
      confirm: t('btn.confirm'),
    },
    onConfirm: () => {
      Inertia.delete(`/events/${props.event.id}`, {
        preserveScroll: true,
        onSuccess: () => {
          successToast();
        },
      });
    },
    title: t('modals.event.delete_title'),
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
          {page.props.auth.user.username}
          /
          {props.event.slug}
        </Text>
        <Group>
          <Center inline>
            <FaClock size="0.8rem"/>
            <Text px={6} size="sm">
              {props.event.duration}
              &nbsp;
              {t('event.events.minute')}
            </Text>
          </Center>
        </Group>
        <Text size="sm">
          {props.event.visible ? (
            <>
              <AiOutlineEye size="0.9rem"/>
              <Text component='span' px={6} size="sm">
                {t('event.events.public')}
              </Text>
            </>
          ) : (
            <>
              <AiOutlineEyeInvisible size="0.9rem"/>
              <Text component='span' px={6} size="sm">{t('event.events.private')}</Text>
            </>
          )}
        </Text>
      </Stack>
      <ActionIcon.Group>
        <Tooltip label={t('btn.preview')}>
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

        <Tooltip label={t('btn.copy_event_link')}>
          <ActionIcon
            variant="outline"
            size="lg"
            onClick={() => {
              clipboard.copy(props.event.link);
              successToast();
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
              leftSection={<BiDuplicate/>}
              onClick={() => {
                Inertia.post(`/events/${props.event.id}/duplicate`, {}, {
                  onSuccess: () => {
                    successToast();
                  }
                })
              }}
            >
              {t('btn.duplicate')}
            </Menu.Item>
            <Menu.Item
              component={InertiaLink}
              href={`/events/${props.event.id}/edit`}
              leftSection={<FaEdit/>}
            >
              {t('btn.edit')}
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item
              leftSection={<FaX/>}
              color="red"
              onClick={openDeleteModal}
            >
              {t('btn.delete')}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </ActionIcon.Group>
    </Group>
  );
}
