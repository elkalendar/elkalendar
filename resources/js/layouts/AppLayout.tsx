import {useDisclosure} from '@mantine/hooks';
import {
    ActionIcon,
    AppShell,
    Avatar,
    Burger,
    Button,
    Flex,
    Image,
    Indicator,
    Menu,
    Text,
    useComputedColorScheme,
    useMantineColorScheme,
    useMantineTheme,
} from '@mantine/core';
import {IoIosArrowDown} from 'react-icons/io';
import {LuExternalLink} from 'react-icons/lu';
import {BiCog, BiLinkExternal} from 'react-icons/bi';
import {Head, InertiaLink, useForm} from '@inertiajs/inertia-react';
import {FiLogOut, FiMoon, FiSun} from 'react-icons/fi';
import React from 'react';
import {Toaster} from 'react-hot-toast';
import useTypedPage from '@/hooks/useTypedPage';
import AppNavbar from '@/components/AppNavbar/AppNavbar';
import {BsFillBellFill} from "react-icons/bs";
import {useTranslation} from "react-i18next";

interface Props {
    title: string;
    bookingsCount?: number;
    children: React.JSX.Element;

    renderHeader?(): React.JSX.Element;
}

export default function (props: Props) {
    const [opened, {toggle}] = useDisclosure();
    const page = useTypedPage();
    const theme = useMantineTheme();
    const colorScheme = useMantineColorScheme();
    const {setColorScheme} = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', {getInitialValueInEffect: true});
    const {t} = useTranslation();

    const logoutForm = useForm();

    return (
        <AppShell
            header={{height: 60}}
            navbar={{width: 230, breakpoint: 'sm', collapsed: {mobile: !opened}}}
            padding="md"
        >
            <Head title={props.title}/>
            <Toaster
                position="bottom-right"
            />
            <AppShell.Header style={{
                backgroundColor: colorScheme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.blue[1],
            }}
            >
                <Flex
                    justify="space-between"
                    align="center"
                    h="100%"
                    px="md"
                >
                    <Flex gap={4} align="center">
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"/>

                        <Image src="/logo.svg" alt="logo" h={26}/>
                    </Flex>

                    <Flex gap={4} align="center">
                        <ActionIcon
                            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                            variant="subtle"
                            size="xl"
                            aria-label="Toggle color scheme"
                        >
                            {
                                computedColorScheme === 'light' ? <FiMoon/> : <FiSun/>
                            }
                        </ActionIcon>

                        <Indicator disabled={page.props.auth.user.notificationsCount < 1} position="bottom-end"
                                   withBorder
                                   color='red'>
                            <ActionIcon
                                variant="subtle"
                                size="xl"
                                aria-label="View notifications"
                            >
                                <BsFillBellFill/>
                            </ActionIcon>
                        </Indicator>

                        <Menu shadow="md">
                            <Menu.Target>
                                <Button
                                    p={0}
                                    justify="space-between"
                                    variant="subtle"
                                    rightSection={<IoIosArrowDown/>}
                                    className="user-btn"
                                >
                                    <Flex py={2} gap={12}>
                                        <Avatar size="2rem" src={page.props.auth.user.avatar}
                                                alt={page.props.auth.user.name}
                                                radius="xl"/>
                                        <Flex visibleFrom='sm' direction="column" align="start">
                                            <Text size="sm">
                                                {page.props.auth.user.name}
                                            </Text>
                                            <Text size="xs">
                                                {page.props.auth.user.email}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Button>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Label>{t('menu.my_account')}</Menu.Label>
                                <Menu.Item
                                    leftSection={<LuExternalLink/>}
                                    component="a"
                                    href={page.props.auth.user.link}
                                    target="_blank"
                                >
                                    {t('menu.show_public_page')}
                                </Menu.Item>
                                <Menu.Item leftSection={<BiCog/>} component={InertiaLink} href="/settings/general">
                                    {t('menu.settings')}
                                </Menu.Item>
                                <Menu.Divider/>
                                <Menu.Item
                                  leftSection={<FiLogOut/>}
                                  onClick={() => {
                                    logoutForm.delete('/logout', {

                                    });
                                  }}
                                >
                                    {t('menu.logout')}
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Flex>
                </Flex>
            </AppShell.Header>
            <AppShell.Navbar
                p="md"
                style={{
                    backgroundColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.blue[0],
                }}
            >
                <AppNavbar/>
            </AppShell.Navbar>
            <AppShell.Main style={{
                backgroundColor: colorScheme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
            }}
            >
                {props.renderHeader ? props.renderHeader() : null}

                {props.children}
            </AppShell.Main>
        </AppShell>
    );
}
