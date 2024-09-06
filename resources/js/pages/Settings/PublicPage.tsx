import React, {useRef, useState} from 'react';
import {Alert, Avatar, Button, Flex, Group, Text, Textarea, TextInput,} from '@mantine/core';
import {useForm} from '@inertiajs/inertia-react';
import {FiSave} from 'react-icons/fi';
import useTypedPage from '@/hooks/useTypedPage';
import PageHeader from '@/components/PageHeader/PageHeader';
import SettingsLayout from '@/layouts/SettingsLayout';
import {Inertia} from "@inertiajs/inertia";
import {useTranslation} from "react-i18next";
import useSuccessToast from "@/hooks/useSuccessToast";

export default function () {
  const {t} = useTranslation();
  const page = useTypedPage();
  const successToast = useSuccessToast();

  const form = useForm({
    name: page.props.auth.user.profileName,
    username: page.props.auth.user.username,
    profileMessage: page.props.auth.user.profileMessage,
    photo: null as File | null,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  function selectNewPhoto() {
    photoRef.current?.click();
  }

  function updatePhotoPreview() {
    const photo = photoRef.current?.files?.[0];

    if (!photo) {
      return;
    }

    form.setData('photo', photo);

    const reader = new FileReader();

    reader.onload = (e) => {
      setPhotoPreview(e.target?.result as string);
    };

    reader.readAsDataURL(photo);
  }

  function deletePhoto() {
    Inertia.delete('/user/profile-photo', {
      preserveScroll: true,
      onSuccess: () => {
        setPhotoPreview(null);
        clearPhotoFileInput();
      },
    });
  }

  function clearPhotoFileInput() {
    if (photoRef.current?.value) {
      photoRef.current.value = '';
      form.setData('photo', null);
    }
  }

  return (
    <SettingsLayout
      title={t('settings.public')}
      renderHeader={() => (
        <PageHeader
          title={t('settings.public')}
          subtitle={t('settings.public_subtitle')}
        />
      )}
    >
      <Flex direction="column" gap={22}>
        <input
          type="file"
          style={{display: 'none'}}
          ref={photoRef}
          onChange={updatePhotoPreview}
        />

        {photoPreview ? (
          <Group mt={12}>
            <Avatar size="lg" src={photoPreview}/>
          </Group>
        ) : (
          <Avatar
            src={page.props.auth.user.profileImage}
            alt={page.props.auth.user.name}
            size="lg"
          />
        )}

        <Flex gap={12} mt={12}>
          <Button onClick={selectNewPhoto}>
            {t('btn.change_avatar')}
          </Button>

          {page.props.auth.user.profileImage ? (
            <Button onClick={deletePhoto} color="red">
              {t('btn.delete')}
            </Button>
          ) : null}
        </Flex>

        {
          form.errors.photo && (
            <Text c="red.4" my={12}>
              {form.errors.photo}
            </Text>
          )
        }

        {form.errors.photo && <Alert>{form.errors.photo}</Alert>}

        <TextInput
          withAsterisk
          label={t('settings.forms.public.name')}
          description={t('settings.forms.public.name_desc')}
          error={form.errors.name}
          value={form.data.name}
          onChange={(e) => form.setData('name', e.currentTarget.value)}
          placeholder="Elon Musk"
        />

        <Flex direction="column">
          <TextInput
            withAsterisk
            label={t('settings.forms.public.username')}
            description={t('settings.forms.public.username_desc')}
            className='ltr'
            value={form.data.username}
            error={form.errors.username}
            onChange={(e) => form.setData('username', e.currentTarget.value)}
            placeholder="elonmusk"
          />

          <Text
            size="sm"
            c="dark.2"
            styles={{
              root: {
                textAlign: 'left',
                direction: 'ltr',
                padding: '0.5rem 0',
              },
            }}
          >
            {page.props.domain}/{form.data.username}
          </Text>
        </Flex>

        <Textarea
          label={t('settings.forms.public.welcome_message')}
          description={t('settings.forms.public.welcome_message_desc')}
          value={form.data.profileMessage}
          onChange={(e) => form.setData('profileMessage', e.target.value)}
          rows={5}
        />

        <Group>
          <Button
            disabled={!form.isDirty || form.processing}
            loading={form.processing}
            onClick={() => {
              form.post('/settings/public-page', {
                preserveScroll: true,
                onSuccess: () => {
                  clearPhotoFileInput();
                  successToast();
                  form.setDefaults();
                },
              });
            }}
            leftSection={<FiSave/>}
          >
            {t('btn.save')}
          </Button>
        </Group>
      </Flex>
    </SettingsLayout>
  );
}
