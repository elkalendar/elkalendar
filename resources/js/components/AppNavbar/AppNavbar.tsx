import React from 'react';
import {Badge, Button, Flex, Stack, Text, useMantineColorScheme, useMantineTheme,} from '@mantine/core';
import {LuExternalLink} from 'react-icons/lu';
import {FiCopy} from 'react-icons/fi';
import {InertiaLink} from '@inertiajs/inertia-react';
import {BiCog} from 'react-icons/bi';
import {useClipboard} from '@mantine/hooks';
import {FaCalendar, FaHome, FaLink} from 'react-icons/fa';
import {BsCalendarWeek} from 'react-icons/bs';
import {AiTwotoneAppstore} from 'react-icons/ai';
import {PiPlugsConnectedFill} from 'react-icons/pi';
import {CiMail} from 'react-icons/ci';
import useTypedPage from '@/hooks/useTypedPage';
import {showSuccessToast} from '@/utils/FormHelpers';

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

  const links: Link[] = [
    {
      icon: <FaHome/>,
      label: 'لوحة التحكم',
      href: '/',
      variant: page.url === '/' ? 'light' : 'subtle',
    },
    {
      icon: <FaLink/>,
      label: 'الاجتماعات',
      href: '/events',
      variant: page.url.includes('/events') ? 'light' : 'subtle',
    },
    {
      icon: <FaCalendar/>,
      label: 'الحجوزات',
      notifications: +page.props.bookingsCount !== 0 ? +page.props.bookingsCount : null,
      href: '/bookings',
      variant: page.url.includes('/bookings') ? 'light' : 'subtle',
    },
    {
      icon: <BsCalendarWeek/>,
      label: 'جدول المواعيد',
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
        <span>{link.label}</span>
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
          href={page.props.auth.user.data.link}
          variant="subtle"
          leftSection={<LuExternalLink/>}
          justify="start"
          target="_blank"
        >
          عرض الصفحة العامة
        </Button>
        <Button
          onClick={() => {
            clipboard.copy(page.props.auth.user.data.link);
            showSuccessToast('تم نسخ الرابط بنجاح');
          }}
          variant="subtle"
          leftSection={<FiCopy/>}
          justify="start"
        >
          نسخ رابط الصفحة العامة
        </Button>
        <Button
          component={InertiaLink}
          href="/settings/public-page"
          variant="subtle"
          leftSection={<BiCog/>}
          justify="start"
        >
          الاعدادات
        </Button>
        <Button
          component="a"
          href="https://forms.gle/Y5S7VeP1bmQfK3ft5"
          variant="subtle"
          target="_blank"
          leftSection={<CiMail/>}
          justify="start"
        >
          قولنا رأيك
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
          &copy; 2023 الكالندر
        </Text>
      </Flex>
    </Stack>
  );
}

export default AppNavbar;
