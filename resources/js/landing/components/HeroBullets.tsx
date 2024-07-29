import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import image from '../../app/assets/svg/calendar.svg';
import classes from './HeroBullets.module.css';

export function HeroBullets() {
  return (
    <Container size='xl'>
      <div className={classes.inner}>
        <Image src={image} className={classes.image} />

        <div className={classes.content}>
          <Title className={classes.title}>
            <span className={classes.highlight}>الكالندر</span> <br />
            <Text  fw='lighter' mt={20}>التطبيق العربي لتنظيم الحجوزات والمقابلات</Text>
          </Title>
          <Text c="dimmed" mt="md">
            ابدأ بتنظيم حجوزاتك في ٣ خطوات
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>حدد مواعيدك</b> – قم بتحديد جدول مواعيدك المتاحة للحجز وسيقوم الكالندر بالأتمتة وعمل اللازم.
            </List.Item>
            <List.Item>
              <b>مشاركة الرابط</b> – قم بمشاركة رابط الكالندر الخاص بك مع الاخرين او قم بربطه على موقعك.
            </List.Item>
            <List.Item>
              <b>احصل على الحجوزات</b> – يقوم الاخرين باختيار وقت مناسب طبقا لجدولك المتاح لحجز موعد معك.
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              قم بالتجربة الأن
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
