import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import PageHeader from '@/components/PageHeader/PageHeader';
import { useDisclosure } from '@mantine/hooks';
import { Button, Flex, Group, PasswordInput } from '@mantine/core';
import { FiSave } from 'react-icons/fi';
import {useForm} from "@inertiajs/inertia-react";
import SettingsLayout from "@/layouts/SettingsLayout";
import {useTranslation} from "react-i18next";
import useSuccessToast from "@/hooks/useSuccessToast";

export default () => {
  const {t} = useTranslation();
  const successToast = useSuccessToast();
  const [visible, { toggle }] = useDisclosure(false);
  const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  function updatePassword(e: React.MouseEvent) {
    e.preventDefault();
    form.put('/settings/password', {
      preserveScroll: true,
      onSuccess: () => {
        successToast();
        form.reset();
      },
    });
  }

  return (
    <SettingsLayout
      title={t('settings.password')}
      renderHeader={() => (
        <PageHeader
          title={t('settings.password')}
          subtitle={t('settings.password_subtitle')}
        />
      )}
    >
      <Flex gap={22} direction='column'>
        <PasswordInput
          withAsterisk
          label={t('settings.forms.password.current')}
          error={form.errors.current_password}
          value={form.data.current_password}
          onChange={(e) => form.setData('current_password', e.currentTarget.value)}
          className='ltr'
        />

        <PasswordInput
          withAsterisk
          label={t('settings.forms.password.new')}
          error={form.errors.password}
          value={form.data.password}
          onChange={(e) => form.setData('password', e.currentTarget.value)}
          className='ltr'
          visible={visible}
          onVisibilityChange={toggle}
        />

        <PasswordInput
          withAsterisk
          label={t('settings.forms.password.new_confirmation')}
          error={form.errors.password_confirmation}
          value={form.data.password_confirmation}
          onChange={(e) => form.setData('password_confirmation', e.currentTarget.value)}
          className='ltr'
          visible={visible}
          onVisibilityChange={toggle}
        />

        <Group mt={32}>
          <Button
            disabled={
              !form.isDirty ||
              form.processing
            }
            loading={form.processing}
            onClick={(e) => updatePassword(e)}
            leftSection={<FiSave />}
          >
            {t('btn.save')}
          </Button>
        </Group>
      </Flex>
    </SettingsLayout>
  );
}
