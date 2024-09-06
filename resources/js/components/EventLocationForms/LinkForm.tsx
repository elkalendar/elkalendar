import React from 'react';
import {
  Flex, Group, Text, Button, TextInput,
} from '@mantine/core';
import {FaInfoCircle, FaPlus} from 'react-icons/fa';
import {useForm} from '@inertiajs/inertia-react';
import {Event} from '@/types/entities';
import {useTranslation} from "react-i18next";

interface LinkFormProps {
  event: Event;
  onSuccess: () => void;
  location?: any;
}

function LinkForm(props: LinkFormProps) {
  const {t} = useTranslation();
  const form = useForm({
    locationId: props.location?.id,
    linkTitle: props.location?.linkTitle,
    link: props.location?.link,
  });

  return (
    <Flex
      direction="column"
      gap={22}
    >
      <TextInput
        label={t('forms.link.title_label')}
        description={t('forms.link.title_description')}
        value={form.data.linkTitle}
        onChange={(e) => form.setData('linkTitle', e.target.value)}
        error={form.errors.linkTitle}
      />

      <TextInput
        withAsterisk
        label={t('forms.link.link_label')}
        description={t('forms.link.link_description')}
        error={form.errors.link}
        className="ltr"
        value={form.data.link}
        onChange={(e) => form.setData('link', e.target.value)}
      />

      <Flex
        align="center"
        gap={8}
      >
        <FaInfoCircle/>
        <Text size="sm">
          {t('forms.link.note')}
        </Text>
      </Flex>

      <Group>
        <Button
          leftSection={<FaPlus/>}
          onClick={() => {
            form.post(`/events/${props.event.id}/locations/link`, {
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

export default LinkForm;
