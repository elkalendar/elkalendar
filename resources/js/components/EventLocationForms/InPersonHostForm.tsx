import React from 'react';
import {useForm} from '@inertiajs/inertia-react';
import {
  Button, Flex, Group, Input, Switch, Textarea,
} from '@mantine/core';
import {FaPlus} from 'react-icons/fa';
import {Event} from '@/types/entities';
import {useTranslation} from "react-i18next";

interface InPersonHostFormProps {
  event: Event;
  onSuccess: () => void;
  location?: any;
}

function InPersonHostForm(props: InPersonHostFormProps) {
  const {t} = useTranslation();
  const form = useForm({
    locationId: props.location?.id,
    address: props.location?.data.address,
    showOnBookingPage: props.location?.data.showOnBookingPage ?? false,
  });

  return (
    <Flex
      direction="column"
      gap={22}
    >
      <Textarea
        withAsterisk
        label={t('forms.in_person_host.input_label')}
        description={t('forms.in_person_host.input_description')}
        required
        value={form.data.address}
        onChange={(e) => form.setData('address', e.target.value)}
        error={form.errors.address}
      />

      <Switch
        label={t('forms.in_person_host.switch_label')}
        description={t('forms.in_person_host.switch_description')}
        checked={form.data.showOnBookingPage}
        onChange={(e) => form.setData('showOnBookingPage', e.currentTarget.checked)}
      />
      <Group>
        <Button
          type="submit"
          leftSection={<FaPlus/>}
          onClick={() => {
            form.post(`/events/${props.event.id}/locations/in-person-host`, {
              preserveScroll: true,
              onSuccess: props.onSuccess,
            });
          }}
        >
          {t('btn.save')}
        </Button>
      </Group>
    </Flex>
  );
}

export default InPersonHostForm;
