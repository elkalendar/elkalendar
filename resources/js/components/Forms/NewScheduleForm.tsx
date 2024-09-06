import {useForm} from "@inertiajs/inertia-react";
import {Button, Flex, TextInput} from "@mantine/core";
import {FaSave} from "react-icons/fa";
import React from "react";
import {useTranslation} from "react-i18next";

interface Props {
  onSuccess: () => void,
}

export const NewScheduleForm = (props: Props) => {
  const {t} = useTranslation();
  const form = useForm({
    name: '',
  });

  return (
    <Flex
      direction="column"
      gap={22}
    >
      <TextInput
        withAsterisk
        label={t('availability.new_name')}
        error={form.errors.name}
        value={form.data.name}
        onChange={(e) => form.setData('name', e.currentTarget.value)}
      />

      <div className="actions">
        <Button
          type="submit"
          onClick={() => {
            form.post('/availability', {
              preserveScroll: true,
              data: form.data,
              onSuccess: props.onSuccess,
            });
          }}
          leftSection={<FaSave/>}
        >
          {t('btn.save')}
        </Button>
      </div>
    </Flex>
  );
};
