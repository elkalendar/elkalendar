import {Head, useForm} from '@inertiajs/inertia-react';
import React from 'react';
import {
  Button, Input, Paper, PasswordInput, Stack,
  Title,
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import AuthenticationLayout from '@/layouts/AuthenticationLayout';

interface Props {
  token: string;
  email: string;
}

export default function ResetPassword({token, email}: Props) {
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
    <AuthenticationLayout
      title="اعادة ضبط كلمة المرور"
    >
      <Head title="اعادة ضبط كلمة المرور"/>

      <Title ta="center">
        اعادة ضبط كلمة المرور
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" w="100%">
        <Stack gap={20}>
          <Input.Wrapper
            withAsterisk
            label="البريد الالكتروني"
            error={form.errors.email}
          >
            <Input
              readOnly
              disabled
              type="email"
              value={form.data.email}
              onChange={(e) => form.setData('email', e.currentTarget.value)}
              className="ltr"
            />
          </Input.Wrapper>

          <PasswordInput
            withAsterisk
            label="كلمة السر"
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
            label="تأكيد كلمة السر"
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
            اعادة ضبط كلمة السر
          </Button>
        </Stack>
      </Paper>
    </AuthenticationLayout>
  );
}
