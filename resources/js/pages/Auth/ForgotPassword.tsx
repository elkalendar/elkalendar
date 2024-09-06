import {Head, useForm} from '@inertiajs/inertia-react';
import {FormEventHandler} from 'react';
import AuthenticationLayout from "@/layouts/AuthenticationLayout";
import {Alert, Text, Button, Input, Paper, Stack, Title} from '@mantine/core';
import {useTranslation} from "react-i18next";
import useSuccessToast from "@/hooks/useSuccessToast";

export default function ForgotPassword({status}: { status?: string }) {
  const {t} = useTranslation();
  const successToast = useSuccessToast();
  const form = useForm({
    email: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    form.clearErrors();

    form.post('/forgot-password', {
      onSuccess: () => {
        successToast();
        form.setDefaults();
      }
    });
  };

  return (
    <AuthenticationLayout>
      <Head title={t('auth.password.forgot_title')} />

      <Title ta='center'>
        {t('auth.password.forgot_title')}
      </Title>

      <Text size='sm' my={20}>
        {t('auth.password.forgot_description')}
      </Text>

      {status && (
        <Alert variant='light' color='green'>
          {status}
        </Alert>
      )}

      <Paper withBorder shadow='md' p={30} mt={30} radius='md' w='100%'>
        <form onSubmit={submit}>
          <Stack gap={20}>
            <Input.Wrapper
              withAsterisk
              label={t('auth.password.email')}
              error={form.errors.email}
            >
              <Input
                error={form.errors.email}
                value={form.data.email}
                onChange={(e) => form.setData('email', e.currentTarget.value)}
                className='ltr'
              />
            </Input.Wrapper>

            <Button
              type='submit'
              disabled={form.processing}
              loading={form.processing}
            >
              {t('auth.password.btn_request')}
            </Button>
          </Stack>
        </form>
      </Paper>
    </AuthenticationLayout>
  );
}
