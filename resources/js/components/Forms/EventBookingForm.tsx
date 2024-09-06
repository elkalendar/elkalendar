import React from 'react';
import {useForm} from '@inertiajs/inertia-react';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai';
import {format} from 'date-fns';
import {Alert, Button, Group, Input, SimpleGrid, Stack, Text, Textarea, TextInput,} from '@mantine/core';
import EventLocationSelector from '@/components/EventLocationSelector';
import {Event, Host} from '@/types/entities';
import useTypedPage from '@/hooks/useTypedPage';
import {formatInTimeZone} from "date-fns-tz";
import {DateFnsFormat} from "@/enums/Time";
import {BiError} from "react-icons/bi";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import {useTranslation} from "react-i18next";

interface EventBookingFormProps {
  event: Event;
  host: Host;
  bookingDate: Date;
  bookingTimeSlot: string;
  guestTimezone: string;
  resetBookingTime: () => void;
  is24Hours: boolean;
}

function EventBookingForm(props: EventBookingFormProps) {
  const {t} = useTranslation();
  const page = useTypedPage();
  const dateFnsLocale = useDateFnsLocale();

  const form = useForm({
    name: page.props.auth.user ? page.props.auth.user.name : '',
    email: page.props.auth.user ? page.props.auth.user.email : '',
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
    form.post(`/${props.host.username}/${props.event.slug}`, {
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
        leftSection={page.props.isRtl ? <AiOutlineArrowRight size={22}/> : <AiOutlineArrowLeft size={22}/>}
      >
        {t('public.choose_other_slot')}
      </Button>

      {
        form.errors.slot && <Alert
          color='red'
          icon={<BiError/>}
          title={t('public.time_error')}
        >{form.errors.slot}</Alert>
      }

      <SimpleGrid cols={3} my={12} px={6}>
        <Text size="sm">
          {t('public.selected_date')}
          <br/>
          {format(props.bookingDate, 'yyy/MM/dd')}
        </Text>
        <Text size="sm">
          {t('public.selected_time')}
          <br/>
          {
            formatInTimeZone(props.bookingTimeSlot, props.guestTimezone, props.is24Hours ? DateFnsFormat.TIME24 : DateFnsFormat.TIME12, {
              locale: dateFnsLocale,
            })
          }
        </Text>
        <Text size="sm">
          {t('public.selected_timezone')}
          <br/>
          {props.guestTimezone}
        </Text>
      </SimpleGrid>

      <Stack gap={22} className="mt-4">
        <TextInput
          withAsterisk
          label={t('public.name')}
          error={form.errors.name}
          dir="auto"
          value={form.data.name}
          onChange={(e) => form.setData('name', e.currentTarget.value)}
        />

        <TextInput
          withAsterisk
          label={t('public.email')}
          error={form.errors.email}
          value={form.data.email}
          onChange={(e) => form.setData('email', e.currentTarget.value)}
        />

        {
          props.event.fields.phone.required && (
            <Input.Wrapper
              withAsterisk
              label={t('public.phone')}
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
          props.event.locations.length > 0 && (
            <EventLocationSelector
              locations={props.event.locations}
              setSelectedLocation={(location: string) => {
                form.setData('location', location);
              }}
              setEventLocationData={(data: any) => form.setData('locationData', data)}
              errors={form.errors}
            />
          )
        }

        <Textarea
          label={t('public.notes')}
          placeholder={t('public.notes_placeholder')}
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
            {t('public.confirm_booking')}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default EventBookingForm;
