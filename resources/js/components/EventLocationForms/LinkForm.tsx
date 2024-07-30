import React from 'react';
import {
  Flex, Group, Text, Input, Button,
} from '@mantine/core';
import { FaInfoCircle, FaPlus } from 'react-icons/fa';
import { useForm } from '@inertiajs/inertia-react';
import { Event } from '@/types/entities';

interface LinkFormProps {
  event: Event;
  onSuccess: () => void;
  location?: any;
}

function LinkForm(props: LinkFormProps) {
  const form = useForm({
    locationId: props.location?.id,
    linkTitle: props.location?.data?.linkTitle,
    link: props.location?.data?.link,
  });

  return (
    <Flex
      direction="column"
      gap={22}
    >
      <Input.Wrapper
        label="عنوان الرابط"
        description="ادخل عنوان مخصص ليظهر لزوارك اثناء اختيار الرابط"
        error={form.errors.linkTitle}
      >
        <Input
          value={form.data.linkTitle}
          onChange={(e) => form.setData('linkTitle', e.target.value)}
          error={form.errors.linkTitle}
        />
      </Input.Wrapper>

      <Input.Wrapper
        withAsterisk
        label="رابط المقابلة"
        description="الرابط الذي سيستخدمه زوارك للانضمام الى الاجتماع"
        error={form.errors.link}
      >
        <Input
          className="ltr"
          value={form.data.link}
          onChange={(e) => form.setData('link', e.target.value)}
          error={form.errors.link}
        />
      </Input.Wrapper>

      <Flex
        align="center"
        gap={8}
      >
        <FaInfoCircle />
        <Text size="sm">
          سيتم اظهار/إرسال الرابط للزوار بعد الحجز
        </Text>
      </Flex>

      <Group>
        <Button
          leftSection={<FaPlus />}
          onClick={() => {
            form.post(`/events/${props.event.id}/locations/link`, {
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

export default LinkForm;
