import React from 'react';
import {
  Flex, Textarea, Button, Group,
} from '@mantine/core';
import { useForm } from '@inertiajs/inertia-react';
import { FaPlus } from 'react-icons/fa';
import { Event } from '@/types/entities';

interface CustomTextFormProps {
  location?: any;
  event: Event;
  onSuccess: () => void;
}

function CustomTextForm(props: CustomTextFormProps) {
  const form = useForm({
    locationId: props.location?.id,
    text: props.location?.data?.text,
  });

  return (
    <Flex
      direction="column"
      gap={22}
    >
      <Textarea
        withAsterisk
        label="النص المخصص"
        description="النص الذي سيتم عرضه/إرساله للزوار بعد الحجز"
        value={form.data.text}
        onChange={(e) => form.setData('text', e.target.value)}
        error={form.errors.text}
      />

      <Group>
        <Button
          type="submit"
          leftSection={<FaPlus />}
          onClick={() => {
            form.post(`/events/${props.event.id}/locations/custom-text`, {
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

export default CustomTextForm;
