import React from 'react';
import {useForm} from '@inertiajs/inertia-react';
import {AiOutlineArrowRight} from 'react-icons/ai';
import {format} from 'date-fns';
import {Alert, Button, Group, Input, SimpleGrid, Stack, Text, Textarea,} from '@mantine/core';
import EventLocationSelector from '@/components/EventLocationSelector';
import {Event, Host} from '@/types/entities';
import useTypedPage from '@/hooks/useTypedPage';
import {formatInTimeZone} from "date-fns-tz";
import {DateFnsFormat} from "@/enums/Time";
import {ar} from "date-fns/locale";
import {BiError} from "react-icons/bi";

interface EventBookingFormProps {
  event: { data: Event };
  host: { data: Host };
  bookingDate: Date;
  bookingTimeSlot: string;
  guestTimezone: string;
  resetBookingTime: () => void;
  is24Hours: boolean;
}

function EventBookingForm(props: EventBookingFormProps) {
  const page = useTypedPage();

  const form = useForm({
    name: page.props.auth.user ? page.props.auth.user.data.name : '',
    email: page.props.auth.user ? page.props.auth.user.data.email : '',
    phone: '',
    notes: '',
    location: null,
    locationData: null,
    slot: props.bookingTimeSlot,
    date: format(props.bookingDate, 'yyy-MM-dd'),
    guests: [],
    timezone: props.guestTimezone,
  });

  function onSubmit(e: React.FormEvent) {
    form.clearErrors();
    e.preventDefault();
    form.post(`/${props.host.data.username}/${props.event.data.slug}`, {
      preserveScroll: true,
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        width: '100%',
      }}
    >
      <Button
        variant="subtle"
        onClick={() => {
          props.resetBookingTime();
        }}
        leftSection={<AiOutlineArrowRight size={22}/>}
      >
        اختيار توقيت آخر
      </Button>

      {
        form.errors.slot && <Alert
          color='red'
          icon={<BiError />}
          title="خطأ بالتوقيت"
        >{form.errors.slot}</Alert>
      }

      <SimpleGrid cols={3} my={12} px={6}>
        <Text size="sm">
          تاريخ الحجز:
          <br/>
          {format(props.bookingDate, 'yyy/MM/dd')}
        </Text>
        <Text size="sm">
          توقيت الحجز:
          <br/>
          {
            formatInTimeZone(props.bookingTimeSlot, props.guestTimezone, props.is24Hours ? DateFnsFormat.TIME24 : DateFnsFormat.TIME12, {
              locale: ar,
            })
          }
        </Text>
        <Text size="sm">
          التوقيت الزمني:
          <br/>
          {props.guestTimezone}
        </Text>
      </SimpleGrid>

      <Stack gap={22} className="mt-4">
        <Input.Wrapper
          withAsterisk
          label="الاسم"
          error={form.errors.name}
        >
          <Input
            dir="auto"
            value={form.data.name}
            onChange={(e) => form.setData('name', e.currentTarget.value)}
          />
        </Input.Wrapper>

        <Input.Wrapper
          withAsterisk
          label="البريد الالكتروني"
          error={form.errors.email}
        >
          <Input
            value={form.data.email}
            onChange={(e) => form.setData('email', e.currentTarget.value)}
          />
        </Input.Wrapper>

        {
          props.event.data.fields.phone.required && (
            <Input.Wrapper
              withAsterisk
              label="رقم الهاتف"
              error={form.errors.phone}
            >
              <Input
                value={form.data.phone}
                onChange={(e) => form.setData('phone', e.currentTarget.value)}
              />
            </Input.Wrapper>
          )
        }

        {
          props.event.data.locations.length > 0 && (
            <EventLocationSelector
              locations={props.event.data.locations}
              setSelectedLocation={(location: string) => {
                form.setData('location', location);
              }}
              setEventLocationData={(data: any) => form.setData('locationData', data)}
              errors={form.errors}
            />
          )
        }

        <Textarea
          placeholder="قم بإدخال أي ملاحظات تخص الحجز"
          label="ملاحظات"
          value={form.data.notes}
          onChange={(e) => form.setData('notes', e.currentTarget.value)}
          error={form.errors.notes}
        />

        <Group>
          <Button
            disabled={form.processing}
            loading={form.processing}
            onClick={onSubmit}
          >
            تأكيد الحجز
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default EventBookingForm;
