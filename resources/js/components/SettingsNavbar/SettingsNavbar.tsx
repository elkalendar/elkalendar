import {Avatar, Button, Divider, Group, Stack,} from '@mantine/core';
import {FaArrowRight} from 'react-icons/fa';
import React from 'react';
import {InertiaLink} from '@inertiajs/inertia-react';
import useTypedPage from '@/hooks/useTypedPage';
import {BiLinkExternal} from "react-icons/bi";

export function SettingsNavbar() {
  const page = useTypedPage();

  return (
    <Stack>
      <Button
        fullWidth
        component={InertiaLink}
        href="/"
        variant="subtle"
        leftSection={<FaArrowRight/>}
        justify="start"
        size="compact-sm"
        className="mb-6"
      >
        العودة
      </Button>

      <Group>
        <Avatar size={32} src={page.props.auth.user.avatar} alt={`${page.props.auth.user.name}'s Avatar`}/>
        <p
          className="truncate text-sm font-medium leading-5"
          title={page.props.auth.user.name}
        >
          {page.props.auth.user.name}
        </p>
      </Group>

      <Stack gap={2}>

        <Button
          fullWidth
          component={InertiaLink}
          href="/settings/general"
          variant={page.url.includes('/settings/general') ? 'light' : 'subtle'}
          justify="start"
        >
          الاعدادات العامة
        </Button>

        <Button
          fullWidth
          component={InertiaLink}
          href="/settings/public-page"
          variant={page.url.includes('/settings/public-page') ? 'light' : 'subtle'}
          justify="start"
        >
          الصفحة العامة
        </Button>

        <Divider my={10}/>

        <Button
          fullWidth
          component='a'
          href={page.props.accountsDomain + '/personal-information'}
          target='_blank'
          variant='subtle'
          justify="start"
          leftSection={<BiLinkExternal />}
        >
          المعلومات الشخصية
        </Button>

        <Button
          fullWidth
          component='a'
          href={page.props.accountsDomain + '/password'}
          target='_blank'
          variant='subtle'
          justify="start"
          leftSection={<BiLinkExternal />}
        >
          كلمة السر
        </Button>
      </Stack>
    </Stack>
  );
}
