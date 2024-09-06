import {FormEventHandler} from 'react';
import {Head, useForm} from '@inertiajs/inertia-react';
import AuthenticationLayout from "@/layouts/AuthenticationLayout";
import {Alert, Button, Paper, PasswordInput, Stack, Title} from '@mantine/core';
import {useTranslation} from "react-i18next";

interface Props {
  status: string;
}

export default function ConfirmPassword(props: Props) {
  const {t} = useTranslation();
  const form = useForm({
    password: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    form.post('/confirm-password', {
      onFinish: () => form.reset('password'),
    });
  };

  return (
    <AuthenticationLayout>
      <Head title={t('auth.password.confirm_title')}/>

      <Title ta='center'>
        {t('auth.password.confirm_title')}
      </Title>

      <Alert>
        {t('auth.password.confirm_description')}
      </Alert>

      {props.status && (
        <Alert variant='light' color='green'>
          {props.status}
        </Alert>
      )}

      <form onSubmit={submit}>
        <Paper withBorder shadow='md' p={30} mt={30} radius='md' w='100%'>
          <Stack gap={20}>
            <PasswordInput
              error={form.errors.password}
              withAsterisk
              size='lg'
              label={t('auth.login.password')}
              type='password'
              value={form.data.password}
              onChange={(e) => form.setData('password', e.currentTarget.value)}
              className='ltr'
            />

            <Button
              type='submit'
              disabled={form.processing}
              loading={form.processing}
              size='lg'
            >
              {t('auth.password.btn_confirm')}
            </Button>
          </Stack>
        </Paper>
      </form>
    </AuthenticationLayout>
  );
}
