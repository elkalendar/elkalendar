import {FormEventHandler} from 'react';
import {Head, useForm} from '@inertiajs/inertia-react';
import AuthenticationLayout from "@/layouts/AuthenticationLayout";
import {Alert, Button, Input, Paper, PasswordInput, Stack, Title} from '@mantine/core';

interface Props {
  status: string;
}

export default function ConfirmPassword(props: Props) {
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
      <Head title="تأكيد كلمة المرور"/>

      <Title ta='center'>
        تأكيد كلمة المرور
      </Title>

      <Alert>
        هذه منطقة آمنة للتطبيق. يرجى تأكيد كلمة المرور الخاصة بك قبل الاستمرار.
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
              label='كلمة السر'
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
              تأكيد كلمة السر
            </Button>
          </Stack>
        </Paper>
      </form>
    </AuthenticationLayout>
  );
}
