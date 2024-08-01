import { Head, Link, useForm } from '@inertiajs/inertia-react';
import React from 'react';
import { Anchor, Button, Input, Paper, PasswordInput, Stack, Text, Title } from '@mantine/core';
import { MdAlternateEmail } from 'react-icons/md';
import { useDisclosure } from '@mantine/hooks';
import AuthenticationLayout from '@/layouts/AuthenticationLayout';

export default function Register() {

  const [visible, { toggle }] = useDisclosure(false);
  const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  return (
    <AuthenticationLayout>
      <Head title='حساب جديد' />

      <Title ta='center'>
        مرحبا بك
      </Title>

      <Text c='dimmed' size='sm' ta='center' mt={5}>
        لديك حساب؟
        {' '}
        <Anchor href='/login' size='sm' component={Link}>
          تسجيل الدخول
        </Anchor>
      </Text>

      <Paper withBorder shadow='md' p={30} mt={30} radius='md' w='100%'>
        <Stack gap={20}>
          <Input.Wrapper
            withAsterisk
            label='الاسم'
            error={form.errors.name}
          >
            <Input
              dir='auto'
              error={form.errors.name}
              value={form.data.name}
              onChange={(e) => form.setData('name', e.currentTarget.value)}
            />
          </Input.Wrapper>
          <Input.Wrapper
            withAsterisk
            label='البريد الالكتروني'
            error={form.errors.email}
          >
            <Input
              error={form.errors.email}
              value={form.data.email}
              onChange={(e) => form.setData('email', e.currentTarget.value)}
              className='ltr'
              rightSection={<MdAlternateEmail />}
            />
          </Input.Wrapper>
          <PasswordInput
            withAsterisk
            label='كلمة السر'
            value={form.data.password}
            error={form.errors.password}
            onChange={(e) => form.setData('password', e.currentTarget.value)}
            type='password'
            className='ltr'
            visible={visible}
            onVisibilityChange={toggle}
          />
          <PasswordInput
            value={form.data.password_confirmation}
            withAsterisk
            label='تأكيد كلمة السر'
            error={form.errors.password_confirmation}
            onChange={(e) => form.setData('password_confirmation', e.currentTarget.value)}
            type='password'
            className='ltr'
            visible={visible}
            onVisibilityChange={toggle}
          />

          <Button
            disabled={form.processing}
            loading={form.processing}
            onClick={async (e) => {
              e.preventDefault();
              form.clearErrors();
              form.post('/register');
            }}
          >
            تسجيل حساب جديد
          </Button>
        </Stack>
      </Paper>
    </AuthenticationLayout>
  );
}
