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

function GoogleMeetForm(props: CustomTextFormProps) {
  const page = useTypedPage();

  return (
    <Flex
      direction="column"
      gap={22}
    >
      <Text size="sm">
        عند تفعيل هذا الخيار سيقوم الكالندر بإنشاء رابط مقابلة Google Meet تلقائياً وارفاقه بالحجز.
      </Text>

      {
        page.props.errors?.google_calendar && (
          <Alert icon={<BiErrorCircle />} color='red'>
            {page.props.errors.google_calendar}
          </Alert>
        )
      }

      <Group>
        <Button
          disabled={page.props.errors?.google_calendar}
          type="submit"
          leftSection={<FaPlus />}
          onClick={() => {
            Inertia.post(`/events/${props.event.id}/locations/google-meet`, {}, {
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

export default GoogleMeetForm;
