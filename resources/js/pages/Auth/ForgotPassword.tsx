import {Head, useForm} from '@inertiajs/inertia-react';
import {FormEventHandler} from 'react';
import AuthenticationLayout from "@/layouts/AuthenticationLayout";
import {Alert, Text, Button, Input, Paper, Stack, Title} from '@mantine/core';
import {showSuccessToast} from "@/utils/FormHelpers";

export default function ForgotPassword({status}: { status?: string }) {
  const form = useForm({
    email: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    form.clearErrors();

    form.post('/forgot-password', {
      onSuccess: () => {
        showSuccessToast('')
      }
    });
  };

  return (
    <AuthenticationLayout title='استعادة كلمة السر'>
      <Head title="Forgot Password"/>

      <Title ta='center'>
        استعادة كلمة المرور
      </Title>

      <Text size='sm' my={20}>
        نسيت كلمة المرور؟
        لا يوجد مشكلة. فقط دعنا نعرف عنوان بريدك الإلكتروني
        وسنرسل لك عبر البريد الإلكتروني رابط إعادة تعيين كلمة المرور الذي سيسمح لك
        باختيار واحدة جديدة.
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
              label='البريد الالكتروني'
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
              ارسال رابط إعادة تعيين كلمة المرور
            </Button>
          </Stack>
        </form>
      </Paper>
    </AuthenticationLayout>
  );
}
