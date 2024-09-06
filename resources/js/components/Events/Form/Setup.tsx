import React from 'react';
import {
  Button,
  ColorPicker,
  ColorSwatch,
  Flex,
  Group,
  Input,
  Popover,
  Slider,
  Switch,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import {TbCheck, TbX} from 'react-icons/tb';
import {FaSave} from 'react-icons/fa';
import {useForm} from '@inertiajs/inertia-react';
import {Event} from '@/types/entities';
import useTypedPage from "@/hooks/useTypedPage";
import {useTranslation} from "react-i18next";
import useSuccessToast from "@/hooks/useSuccessToast";

interface SetupProps {
  event: Event;
}

function Setup(props: SetupProps) {
  const successToast = useSuccessToast();
  const {t} = useTranslation();
  const page = useTypedPage();
  const form = useForm({
    name: props.event.name ?? null,
    slug: props.event.slug ?? null,
    visible: props.event.visible ?? true,
    duration: props.event.duration ?? 30,
    description: props.event.description ?? null,
    color: props.event.color ?? '#20aedd',
  });

  return (
    <Flex direction="column" gap={22} px={12}>
      <TextInput
        withAsterisk
        label={t('forms.event.setup.name_label')}
        error={form.errors.name}
        value={form.data.name}
        onChange={(e) => form.setData('name', e.currentTarget.value)}
      />

      <Textarea
        label={t('forms.event.setup.description_label')}
        description={t('forms.event.setup.description_description')}
        error={form.errors.description}
        value={form.data.description}
        onChange={(e) => form.setData('description', e.currentTarget.value)}
        autosize
        minRows={3}
      />

      <>
        <TextInput
          withAsterisk
          label={t('forms.event.setup.slug_label')}
          description={t('forms.event.setup.slug_description')}
          error={form.errors.slug}
          value={form.data.slug}
          onChange={(e) => form.setData('slug', e.currentTarget.value)}
          className='ltr'
        />

        <Text
          size="sm"
          c="gray.3"
          styles={{
            root: {
              textAlign: 'left',
              padding: '0.5rem 0',
              direction: 'ltr'
            },
          }}
        >
          {"https://elkalendar.com/" + page.props.auth.user.username + "/"}
        </Text>
      </>

      <Input.Wrapper
        withAsterisk
        label={t('forms.event.setup.duration_label')}
        description={t('forms.event.setup.duration_description')}
        error={form.errors.duration}
      >
        <Slider
          label={(value) => value + ' ' + t('forms.event.setup.minute')}
          min={15}
          max={120}
          step={5}
          defaultValue={form.data.duration}
          onChange={(value) => form.setData('duration', value)}
        />
        <Text size="xs" mt={6}>
          {form.data.duration}
          {' '}
          {t('forms.event.setup.minute')}
        </Text>
      </Input.Wrapper>

      <Switch
        checked={form.data.visible}
        onChange={(e) => {
          form.setData('visible', e.currentTarget.checked);
        }}
        color="teal"
        size="md"
        label={t('forms.event.setup.visible_label')}
        thumbIcon={
          form.data.visible ? (
            <TbCheck size={12} className="text-green-600"/>
          ) : (
            <TbX size={12} className="text-red-600"/>
          )
        }
        error={form.errors.visible}
      />

      <Input.Wrapper
        label={t('forms.event.setup.color_label')}
        description={t('forms.event.setup.color_description')}
        error={form.errors.color}
      >
        <Popover position="bottom" withArrow shadow="md">
          <Popover.Target>
            <ColorSwatch color={form.data.color}/>
          </Popover.Target>
          <Popover.Dropdown className="w-fit">
            <ColorPicker
              id="color"
              value={form.data.color}
              className="mt-2"
              saturationLabel="Saturation"
              hueLabel="Hue"
              alphaLabel="Alpha"
              onChange={(e) => form.setData('color', e)}
            />
          </Popover.Dropdown>
        </Popover>
      </Input.Wrapper>

      <Group>
        <Button
          onClick={(e) => {
            e.preventDefault();

            form.patch(`/events/${props.event.id}`, {
              preserveScroll: true,
              onSuccess: () => {
                form.setDefaults();
                successToast();
              },
            });
          }}
          leftSection={<FaSave/>}
          disabled={!form.isDirty || form.processing}
        >
          {t('btn.save')}
        </Button>
      </Group>
    </Flex>
  );
}

export default Setup;
