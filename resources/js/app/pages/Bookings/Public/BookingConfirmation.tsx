import React, {useState} from 'react';
import {
  Anchor,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Image,
  Modal,
  Stack,
  Text,
  Textarea,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import {formatInTimeZone} from 'date-fns-tz';
import dayjs from 'dayjs';
import {ar} from 'date-fns/locale';
import {Head, useForm} from '@inertiajs/inertia-react';
import {DateFnsFormat} from '@/enums/Time';
import {getEventLocationForConfirmation, getEventLocationIcon,} from '@/utils/EventLocationTypeHelpers';
import useTypedPage from '@/hooks/useTypedPage';
import AddToCalendarButtons from '@/components/AddToCalendarButtons';
import {showSuccessToast} from "@/utils/FormHelpers";
import {MdOutlineCancel} from "react-icons/md";
import {FaX} from "react-icons/fa6";

export default function () {
  const page = useTypedPage();
  const colorScheme = useMantineColorScheme();
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const form = useForm({
    cancel_reason: '',
  });

  return (
    <Center>
      <Head title="تم تأكيد الحجز"/>
      <Modal
        centered
        opened={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        title="إلغاء الحجز"
      >
        <Flex gap={22} direction="column">
          <Textarea
            withAsterisk
            label="سبب الإلغاء"
            description="سيتم إرسال إشعار بالإلغاء لجميع المدعويين عن طريق البريد الالكتروني."
            placeholder="مثال: لا يمكنني الحضور لأسباب شخصية."
            error={form.errors.cancel_reason}
            value={form.data.cancel_reason}
            onChange={(e) => form.setData('cancel_reason', e.currentTarget.value)}
          />

          <div className="actions">
            <Button
              type="submit"
              color="red"
              onClick={() => {
                form.post(`/bookings/${page.props.booking.data.id}/cancel-by-guest`, {
                  preserveScroll: true,
                  onSuccess: () => {
                    showSuccessToast('تم إلغاء الحجز بنجاح');
                    setCancelModalOpen(false);
                  },
                });
              }}
              leftSection={<MdOutlineCancel/>}
            >
              إلغاء الحجز
            </Button>
          </div>
        </Flex>
      </Modal>

      <Flex
        my={66}
        bg={colorScheme.colorScheme === 'dark' ? 'gray.7' : 'gray.4'}
        direction="column"
        maw={600}
        style={{borderRadius: 8}}
      >
        <Flex bg={colorScheme.colorScheme === 'dark' ? 'gray.8' : 'gray.3'} gap={22} p={44} direction="column"
              align="center" justify="center">
          <BsFillCheckCircleFill size={42}/>
          <Title size="md">
            تمت جدولة هذا الاجتماع
          </Title>
          <Text>
            لقد أرسلنا بريدًا إلكترونيًا يتضمن دعوة تقويمية تتضمن التفاصيل للجميع.
          </Text>
        </Flex>

        <Stack p={22} gap={22}>
          <Flex direction="column">
            <Text>
              الاجتماع:
            </Text>
            <Group>
              {page.props.event.data.name}
            </Group>
          </Flex>

          <Flex direction="column">
            <Text>
              توقيت الاجتماع:
            </Text>
            <Flex
              direction="column"
              gap={2}
            >
              <Text>
                {
                  formatInTimeZone(dayjs(page.props.booking.data.startTimeGuest).toDate(), page.props.booking.data.timezone, DateFnsFormat.DATE, {
                    locale: ar,
                  })
                }
              </Text>
              <span>
                {' '}
                {
                  formatInTimeZone(dayjs(page.props.booking.data.startTimeGuest).toDate(), page.props.booking.data.timezone, DateFnsFormat.TIME12, {
                    locale: ar,
                  })
                }
                {' '}
                -
                {' '}
                {formatInTimeZone(dayjs(page.props.booking.data.endTimeGuest).toDate(), page.props.booking.data.timezone, DateFnsFormat.TIME12, {
                  locale: ar,
                })}
                &nbsp;
                (بتوقيت
                {' '}
                {page.props.booking.data.timezone}
                )
              </span>
            </Flex>
          </Flex>

          <Flex direction="column">
            <Text>
              طريقة الانعقاد:
            </Text>
            <Flex justify="items-start" gap={8}>
              <Group>
                {getEventLocationIcon(page.props.booking.data.location)}
              </Group>

              <Flex direction="column" align="items-start">
                <Text>{getEventLocationForConfirmation(page.props.booking.data.location, page.props.booking.data.locationData)}</Text>
              </Flex>
            </Flex>
          </Flex>

          <Divider/>

          <Flex>
            <Button
              color="red"
              variant="subtle"
              leftSection={<FaX/>}
              size="xs"
              onClick={() => setCancelModalOpen(true)}
            >
              إلغاء الحجز
            </Button>
          </Flex>

          <Flex direction="column">
            <AddToCalendarButtons
              title="اضافة الاجتماع إلى التقويم"
              bookingId={page.props.booking.data.id}
              googleLink={page.props.booking.data.addToCalendarLinksGuest.google}
              officeLink={page.props.booking.data.addToCalendarLinksGuest.office}
              outlookLink={page.props.booking.data.addToCalendarLinksGuest.outlook}
            />
          </Flex>

          <Flex justify='center'>
            <Button
              component="a"
              href={page.props.host.data.link}
              variant='subtle'
            >
              العودة إلى صفحة الحجز
            </Button>
          </Flex>
        </Stack>

        <Flex bg={colorScheme.colorScheme === 'dark' ? 'gray.8' : 'gray.3'} gap={12} p={44} direction="column"
              align="center" justify="center">
          <Image w={44} src="/logo.svg"/>

          <Text size="sm">
            مدعم من قبل&nbsp;
            <Anchor target="_blank" href="https://elkalendar.com">
              الكالندر
            </Anchor>
          </Text>
        </Flex>
      </Flex>
    </Center>
  );
}
