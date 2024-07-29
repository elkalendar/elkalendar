import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  Image,
  ScrollArea,
  rem,
  useMantineTheme,
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from '@tabler/icons-react';
import classes from './HeaderMegaMenu.module.css';
import useTypedPage from "@/hooks/useTypedPage";

const mockdata = [
  {
    icon: IconCode,
    title: 'دعم اللغة العربية',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'الربط والتكاملات',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'الاشعارات',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];

export function HeaderMegaMenu() {
  const page = useTypedPage();
  const [drawerOpened, {toggle: toggleDrawer, close: closeDrawer}] = useDisclosure(false);
  const [linksOpened, {toggle: toggleLinks}] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon style={{width: rem(22), height: rem(22)}} color={theme.colors.blue[6]}/>
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box p={10} pb={20}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Image src={'/logo.svg'} h={32}/>

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className={classes.link}>
              الرئيسية
            </a>
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mx={5}>
                      مميزات الكالندر
                    </Box>
                    <IconChevronDown
                      style={{width: rem(16), height: rem(16)}}
                      color={theme.colors.blue[6]}
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{overflow: 'hidden'}}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>مميزات الكالندر</Text>
                  <Anchor href="#" fz="xs">
                    عرض الجميع
                  </Anchor>
                </Group>

                <Divider my="sm"/>

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        البدء باستخدام الكالندر
                      </Text>
                      <Text size="xs" c="dimmed">
                        قم بتجربة الكالندر الان مجانا
                      </Text>
                    </div>
                    <Button>ابدأ الان</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <a href="#" className={classes.link}>
              من نحن؟
            </a>
            <a href="#" className={classes.link}>
              تواصل معنا
            </a>
          </Group>

          {
            !page.props.auth.user ? <Group visibleFrom="sm">
                <Button variant="default">تسجيل الدخول</Button>
                <Button>حساب جديد</Button>
              </Group> :
              <Button visibleFrom="sm" component='a' href={'https://app.' + page.props.domain}>لوحة التحكم</Button>
          }


          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm"/>
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm"/>

          <a href="#" className={classes.link}>
            الرئيسية
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mx={5}>
                مميزات الكالندر
              </Box>
              <IconChevronDown
                style={{width: rem(16), height: rem(16)}}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            من نحن؟
          </a>
          <a href="#" className={classes.link}>
            تواصل معنا
          </a>

          <Divider my="sm"/>

          {
            !page.props.auth.user ? <Group justify="center" grow pb="xl" px="md">
              <Button variant="default">تسجيل الدخول</Button>
              <Button>Sign up</Button>
            </Group> : <Group justify="center" grow pb="xl" px="md">
              <Button component='a' href={'https://app.' + page.props.domain}>لوحة التحكم</Button>
            </Group>
          }

        </ScrollArea>
      </Drawer>
    </Box>
  );
}
