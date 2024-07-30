import React from 'react';
import {
  Button, Flex, Group, Text,
} from '@mantine/core';
import { FaPlus } from 'react-icons/fa';
import { Inertia } from '@inertiajs/inertia';
import { Event } from '@/types/entities';

interface InPersonHostFormProps {
  event: Event;
  onSuccess: () => void;
}

function InPersonGuestForm(props: InPersonHostFormProps) {
  return (
    <Flex
      direction="column"
      gap={22}
    >
      <Text size="sm">
        عند تفعيل هذا الخيار سيقوم الكالندر بطلب من المدعو إدخال عنوانه اثناء الحجز
      </Text>

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
          حفظ
        </Button>
      </Group>
    </Flex>
  );
}

export default InPersonGuestForm;
