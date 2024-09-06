import React from 'react';
import {
  Button, Flex, Group, Text,
} from '@mantine/core';
import { FaPlus } from 'react-icons/fa';
import { Inertia } from '@inertiajs/inertia';
import { Event } from '@/types/entities';
import {useTranslation} from "react-i18next";

interface InPersonHostFormProps {
  event: Event;
  onSuccess: () => void;
}

function InPersonGuestForm(props: InPersonHostFormProps) {
  const {t} = useTranslation();
  return (
    <Flex
      direction="column"
      gap={22}
    >
      <Text size="sm">{t('forms.in_person_guest.description')}</Text>

      <Group>
        <Button
          type="submit"
          leftSection={<FaPlus />}
          onClick={() => {
            Inertia.post(`/events/${props.event.id}/locations/in-person-guest`, {}, {
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

export default InPersonGuestForm;
