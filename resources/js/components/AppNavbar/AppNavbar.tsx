import React from 'react';
import {Badge, Button, Divider, Flex, Stack, Text, useMantineColorScheme, useMantineTheme,} from '@mantine/core';
import {LuExternalLink} from 'react-icons/lu';
import {FiCopy} from 'react-icons/fi';
import {InertiaLink} from '@inertiajs/inertia-react';
import {BiCog} from 'react-icons/bi';
import {useClipboard} from '@mantine/hooks';
import {FaCalendar, FaHome, FaLink} from 'react-icons/fa';
import {BsCalendarWeek, BsGithub} from 'react-icons/bs';
import useTypedPage from '@/hooks/useTypedPage';
import {useTranslation} from "react-i18next";
import useSuccessToast from "@/hooks/useSuccessToast";

interface Link {
  icon?: React.JSX.Element;
  label: string;
  href: string;
  notifications?: number;
  variant: 'light' | 'subtle';
}

function AppNavbar() {
  const clipboard = useClipboard({timeout: 500});
  const page = useTypedPage();
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();
  const {t} = useTranslation();

  const links: Link[] = [
    {
      icon: <FaHome/>,
      label: 'menu.dashboard',
      href: '/',
      variant: page.url === '/' ? 'light' : 'subtle',
    },
    {
      icon: <FaLink/>,
      label: 'menu.events',
      href: '/events',
      variant: page.url.includes('/events') ? 'light' : 'subtle',
    },
    {
      icon: <FaCalendar/>,
      label: 'menu.bookings',
      notifications: +page.props.bookingsCount !== 0 ? +page.props.bookingsCount : null,
      href: '/bookings',
      variant: page.url.includes('/bookings') ? 'light' : 'subtle',
    },
    {
      icon: <BsCalendarWeek/>,
      label: 'menu.availability',
      href: '/availability',
      variant: page.url.includes('/availability') ? 'light' : 'subtle',
    },
  ];

  const mainLinks = links.map((link: Link, index: number) => {
    return <Button
      fullWidth
      component={InertiaLink}
      href={link.href}
      variant={link.variant}
      key={index}
      justify="space-between"
      rightSection={link.notifications && (
        <Badge size="sm" variant="filled">
          {link.notifications}
        </Badge>
      )}
    >
      <Flex gap={8}>
        {link.icon}
        <span>{t(link.label)}</span>
      </Flex>
    </Button>;
  });

  return (
    <Stack
      h="100%"
      justify="space-between"
    >
      <Flex
        gap={2}
        direction="column"
      >
        {mainLinks}
      </Flex>

      <Flex
        direction="column"
      >
        <Button
          component="a"
          href={page.props.auth.user.link}
          variant="subtle"
          leftSection={<LuExternalLink/>}
          justify="start"
          target="_blank"
        >
          {t('menu.show_public_page')}
        </Button>
        <Button
          onClick={() => {
            clipboard.copy(page.props.auth.user.link);
            useSuccessToast();
          }}
          variant="subtle"
          leftSection={<FiCopy/>}
          justify="start"
        >
          {t('menu.copy_public_page_url')}
        </Button>
        <Button
          component={InertiaLink}
          href="/settings/general"
          variant="subtle"
          leftSection={<BiCog/>}
          justify="start"
        >
          {t('menu.settings')}
        </Button>
        <Divider my={2}/>
        <Button
          component="a"
          href="https://github.com/elkalendar/elkalendar"
          variant="subtle"
          color='gray'
          target="_blank"
          leftSection={<BsGithub/>}
          justify="start"
        >
          {t('menu.source_code')}
        </Button>
        <Text
          styles={{
            root: {
              color: colorScheme.colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.gray[2],
              textAlign: 'center',
            },
          }}
          size="xs"
          mt={12}
        >
          &copy; {page.props.year}

          &nbsp;{t('app.name')}
        </Text>
      </Flex>
    </Stack>
  );
}

export default AppNavbar;
