import React, {PropsWithChildren} from 'react';
import {Toaster} from 'react-hot-toast';
import {Head} from '@inertiajs/inertia-react';
import {AppShell, Burger, Container, Flex, Image, Text, useMantineColorScheme, useMantineTheme,} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {SettingsNavbar} from '@/components/SettingsNavbar/SettingsNavbar';
import {useTranslation} from "react-i18next";

interface Props {
  title: string;

  renderHeader?(): React.JSX.Element;
}

export default function SettingsLayout({title, renderHeader, children}: PropsWithChildren<Props>) {
  const [opened, {toggle}] = useDisclosure();
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();
  const {t} = useTranslation();

  return (
    <AppShell
      header={{height: 60}}
      navbar={{width: 230, breakpoint: 'sm', collapsed: {mobile: !opened}}}
      padding="md"
    >
      <Head title={title}/>
      <Toaster
        position="bottom-right"
      />
      <AppShell.Header style={{
        backgroundColor: colorScheme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.blue[1],
      }}
      >
        <Flex h="100%" px={12} gap={4} align="center">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"/>

          <Image src="/logo.svg" alt="logo" h={26}/>

          <Text size="lg" fw={700} className="text-emphasis">
            {t('app.name')}
          </Text>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        style={{
          backgroundColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.blue[0],
        }}
      >
        <SettingsNavbar/>
      </AppShell.Navbar>
      <AppShell.Main
        style={{
          backgroundColor: colorScheme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        }}
      >
        <Container mx='0' size='md' p={12}>
          {renderHeader ? renderHeader() : null}

          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
