import {Avatar, Button, Divider, Group, Stack,} from '@mantine/core';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import React from 'react';
import {InertiaLink, Link} from '@inertiajs/inertia-react';
import useTypedPage from '@/hooks/useTypedPage';
import {BiLinkExternal} from "react-icons/bi";
import {useTranslation} from "react-i18next";

export function SettingsNavbar() {
  const page = useTypedPage();
  const {t} = useTranslation();

  return (
    <Stack>
      <Button
        fullWidth
        component={InertiaLink}
        href="/"
        variant="subtle"
        leftSection={page.props.isRtl ? <FaArrowRight/> : <FaArrowLeft/>}
        justify="start"
        size="compact-sm"
        className="mb-6"
      >
        {t('btn.back')}
      </Button>

      <Group>
        <Avatar size={32} src={page.props.auth.user.profileImage} alt={`${page.props.auth.user.name}'s Avatar`}/>
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
          {t('settings.general')}
        </Button>

        <Button
          fullWidth
          component={InertiaLink}
          href="/settings/public-page"
          variant={page.url.includes('/settings/public-page') ? 'light' : 'subtle'}
          justify="start"
        >
          {t('settings.public')}
        </Button>

        <Divider my={10}/>

        {/*<Button*/}
        {/*  fullWidth*/}
        {/*  component={Link}*/}
        {/*  href='/settings/personal-information'*/}
        {/*  variant={page.url.includes('/settings/personal-information') ? 'light' : 'subtle'}*/}
        {/*  justify="start"*/}
        {/*  leftSection={<BiLinkExternal/>}*/}
        {/*>*/}
        {/*  {t('settings.personal')}*/}
        {/*</Button>*/}

        <Button
          fullWidth
          component={Link}
          href='/settings/password'
          variant={page.url.includes('/settings/password') ? 'light' : 'subtle'}
          justify="start"
          leftSection={<BiLinkExternal/>}
        >
          {t('settings.password')}
        </Button>
      </Stack>
    </Stack>
  );
}
