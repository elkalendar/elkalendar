import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import {
  Button, Flex, Group, Input, Switch,
} from '@mantine/core';
import { FaPlus } from 'react-icons/fa';
import { Event } from '@/types/entities';

interface InPersonHostFormProps {
  event: Event;
  onSuccess: () => void;
  location?: any;
}

function InPersonHostForm(props: InPersonHostFormProps) {
  const form = useForm({
    locationId: props.location?.id,
    address: props.location?.data?.address,
    showOnBookingPage: props.location?.data?.showOnBookingPage ?? false,
  });

  return (
    <Flex
      direction="column"
      gap={22}
    >
      <Input.Wrapper
        withAsterisk
        label="العنوان"
        description="العنوان او المكان الذي سيتم عرضه للزوار"
        error={form.errors.address}
      >
        <Input
          required
          value={form.data.address}
          onChange={(e) => form.setData('address', e.target.value)}
          error={form.errors.address}
        />
      </Input.Wrapper>

      <Switch
        label="العرض أثناء الحجز"
        description="إذا تم تفعيل هذا الخيار، سيتم عرض هذا المكان للزوار أثناء عملية الحجز"
        checked={form.data.showOnBookingPage}
        onChange={(e) => form.setData('showOnBookingPage', e.currentTarget.checked)}
      />

      <Group>
        <Button
          type="submit"
          leftSection={<FaPlus />}
          onClick={() => {
            form.post(`/events/${props.event.id}/locations/in-person-host`, {
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

export default InPersonHostForm;
