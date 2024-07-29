import React from 'react';
import {
  Flex, Text, Button, Group, Alert,
} from '@mantine/core';
import { useForm } from '@inertiajs/inertia-react';
import { FaPlus } from 'react-icons/fa';
import { Event } from '@/types/entities';
import useTypedPage from "@/hooks/useTypedPage";
import {Inertia} from "@inertiajs/inertia";
import {BiErrorCircle} from "react-icons/bi";

interface CustomTextFormProps {
  defaultText?: string;
  event: Event;
  onSuccess: () => void;
}

export default (props: CustomTextFormProps) => {
  const page = useTypedPage();

  return (
    <Flex
      direction="column"
      gap={22}
    >
      <Text size="sm">
        عند تفعيل هذا الخيار سيقوم الكالندر بإنشاء رابط مقابلة زووم Zoom تلقائياً وارفاقه بالحجز.
      </Text>

      {
        page.props.errors?.zoom && (
          <Alert icon={<BiErrorCircle />} color='red'>
            {page.props.errors.zoom}
          </Alert>
        )
      }

      <Group>
        <Button
          disabled={page.props.errors?.zoom}
          type="submit"
          leftSection={<FaPlus />}
          onClick={() => {
            Inertia.post(`/events/${props.event.id}/locations/zoom`, {}, {
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
