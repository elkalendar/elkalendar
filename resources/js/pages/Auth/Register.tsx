import {Head, Link, useForm} from '@inertiajs/inertia-react';
import React from 'react';
import {Anchor, Button, Input, Paper, PasswordInput, Stack, Text, TextInput, Title} from '@mantine/core';
import {MdAlternateEmail} from 'react-icons/md';
import {useDisclosure} from '@mantine/hooks';
import AuthenticationLayout from '@/layouts/AuthenticationLayout';
import {useTranslation} from "react-i18next";

export default function Register() {
  const {t} = useTranslation();
  const [visible, {toggle}] = useDisclosure(false);
  const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  return (
    <AuthenticationLayout>
      <Head title={t('auth.register.title')}/>

      <Title ta='center'>
        {t('auth.register.welcome')}
      </Title>

      <Text c='dimmed' size='sm' ta='center' mt={5}>
        {t('auth.register.have_account')}
        {' '}
        <Anchor href='/login' size='sm' component={Link}>
          {t('auth.register.login')}
        </Anchor>
      </Text>

      <Paper withBorder shadow='md' p={30} mt={30} radius='md' w='100%'>
        <Stack gap={20}>
          <TextInput
            dir='auto'
            withAsterisk
            label={t('auth.register.name')}
            error={form.errors.name}
            value={form.data.name}
            onChange={(e) => form.setData('name', e.currentTarget.value)}
          />
          <TextInput
            withAsterisk
            label={t('auth.register.email')}
            error={form.errors.email}
            value={form.data.email}
            onChange={(e) => form.setData('email', e.currentTarget.value)}
            className='ltr'
            rightSection={<MdAlternateEmail/>}
          />
          <PasswordInput
            withAsterisk
            label={t('auth.register.password')}
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
            label={t('auth.register.password_confirmation')}
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
            {t('auth.register.btn_register')}
          </Button>
        </Stack>
      </Paper>
    </AuthenticationLayout>
  );
}
