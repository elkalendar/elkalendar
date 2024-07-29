import {Text, Container, ActionIcon, Group, rem, Image, Avatar} from '@mantine/core';
import {IconBrandTwitter, IconBrandYoutube, IconBrandInstagram} from '@tabler/icons-react';
import classes from './FooterLinks.module.css';

const data = [
  {
    title: 'عن الكالندر',
    links: [
      {label: 'المميزات', link: '#'},
      {label: 'الاسعار', link: '#'},
      {label: 'الدعم', link: '#'},
      {label: 'تواصل معنا', link: '#'},
      {label: 'الاسئلة الشائعة', link: '#'},
    ],
  },
  {
    title: 'الخصوصية',
    links: [
      {label: 'سياسة الخصوصية', link: '#'},
      {label: 'شروط الاستخدام', link: '#'},
    ],
  },
  {
    title: 'المطورين',
    links: [
      {label: 'سجل التحديثات', link: '#'},
      {label: 'APIs', link: '#'},
    ],
  },
];

export function FooterLinks() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container size='xl' className={classes.inner}>
        <div className={classes.logo}>
          <Avatar src={'/logo.png'}/>
          <Text size="xs" c="dimmed" className={classes.description}>
            الكالندر هو اداة لمساعدتك للحصول على جدولة سهلة وفعالة لمواعيدك ومكالماتك، ويكون مفيدًا إذا كنت تريد أن يحجز زائري موقعك او عملائك فترة زمنية محددة في تقويمك الخاص بالاجتماعات سواء كانت عبر الإنترنت او غير ذلك.
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          جميع الحقوق محفوظة &copy; 2024 | الكالندر
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
