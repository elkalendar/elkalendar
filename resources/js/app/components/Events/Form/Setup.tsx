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
} from '@mantine/core';
import {TbCheck, TbX} from 'react-icons/tb';
import {FaSave} from 'react-icons/fa';
import {useForm} from '@inertiajs/inertia-react';
import {Event} from '@/types/entities';
import SlugInput from '@/components/SlugInput';
import {showSuccessToast} from '@/utils/FormHelpers';
import useTypedPage from "@/hooks/useTypedPage";

interface SetupProps {
  event: Event;
}

function Setup(props: SetupProps) {
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
      <Input.Wrapper
        withAsterisk
        label="الاسم"
        error={form.errors.name}
      >
        <Input
          value={form.data.name}
          onChange={(e) => form.setData('name', e.currentTarget.value)}
        />
      </Input.Wrapper>

      <Textarea
        label="وصف الاجتماع"
        description="وصف مختصر عن الاجتماع ليظهر في صفحة الحجز"
        error={form.errors.description}
        value={form.data.description}
        onChange={(e) => form.setData('description', e.currentTarget.value)}
        autosize
        minRows={3}
      />

      <Input.Wrapper
        withAsterisk
        label="رابط الاجتماع"
        description="اختر رابط الاجتماع الذي ستشاركه مع الاشخاص لحجز الاجتماع. يجب ان يكون حروف وارقام انجليزية فقط."
        error={form.errors.slug}
      >
        <SlugInput
          prefix={"https://elkalendar.com/" + page.props.auth.user.data.username + "/"}
          value={form.data.slug}
          onChange={(e) => form.setData('slug', e.currentTarget.value)}
        />
      </Input.Wrapper>

      <Input.Wrapper
        withAsterisk
        label="مدة الاجتماع"
        description="اختر مدة الاجتماع بالدقائق"
        error={form.errors.duration}
      >
        <Slider
          label={(value) => `${value} دقيقة`}
          min={15}
          max={120}
          step={5}
          defaultValue={form.data.duration}
          onChange={(value) => form.setData('duration', value)}
        />
        <Text size="xs" mt={6}>
          {form.data.duration}
          {' '}
          دقيقة
        </Text>
      </Input.Wrapper>

      <Switch
        checked={form.data.visible}
        onChange={(e) => {
          form.setData('visible', e.currentTarget.checked);
        }}
        color="teal"
        size="md"
        label="عرض في الصفحة الشخصية؟"
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
        label="لون الاجتماع"
        description="تخصيص الاجتماع بلون مميز"
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
          onClick={() => {
            form.put(`/events/${props.event.id}`, {
              preserveScroll: true,
              onSuccess: () => {
                showSuccessToast();
              },
            });
          }}
          leftSection={<FaSave/>}
          disabled={!form.isDirty || form.processing}
        >
          حفظ
        </Button>
      </Group>
    </Flex>
  );
}

export default Setup;
