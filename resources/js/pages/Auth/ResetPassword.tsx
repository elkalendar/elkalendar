import {Head, useForm} from '@inertiajs/inertia-react';
import React from 'react';
import {
  Button, Paper, PasswordInput, Stack, TextInput, Title,
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import AuthenticationLayout from '@/layouts/AuthenticationLayout';
import {useTranslation} from "react-i18next";

interface Props {
  token: string;
  email: string;
}

export default function ResetPassword({token, email}: Props) {
  const {t} = useTranslation();
  const [visible, {toggle}] = useDisclosure(false);

  const form = useForm({
    token,
    email,
    password: '',
    password_confirmation: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.clearErrors();
    form.post('/reset-password', {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
  }

  return (
    <AuthenticationLayout>
      <Head title={t('auth.password.reset_title')}/>

      <Title ta="center">
        {t('auth.password.reset_title')}
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" w="100%">
        <Stack gap={20}>
          <TextInput
            withAsterisk
            label={t('auth.password.email')}
            error={form.errors.email}
            readOnly
            disabled
            type="email"
            value={form.data.email}
            onChange={(e) => form.setData('email', e.currentTarget.value)}
            className="ltr"
          />

          <PasswordInput
            withAsterisk
            label={t('auth.login.password')}
            error={form.errors.password}
            value={form.data.password}
            onChange={(e) => form.setData('password', e.currentTarget.value)}
            type="password"
            className="ltr"
            visible={visible}
            onVisibilityChange={toggle}
          />

          <PasswordInput
            withAsterisk
            label={t('auth.register.password_confirmation')}
            error={form.errors.password_confirmation}
            value={form.data.password_confirmation}
            onChange={(e) => form.setData('password_confirmation', e.currentTarget.value)}
            type="password"
            className="ltr"
            visible={visible}
            onVisibilityChange={toggle}
          />

          <Button
            loading={form.processing}
            disabled={form.processing}
            onClick={onSubmit}
          >
            {t('auth.password.btn_reset')}
          </Button>
        </Stack>
      </Paper>
    </AuthenticationLayout>
  );
}
