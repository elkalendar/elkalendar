import {FormEventHandler} from 'react';
import {Head, Link, useForm} from '@inertiajs/inertia-react';
import AuthenticationLayout from "@/layouts/AuthenticationLayout";
import {
  Title,
  Anchor,
  Text,
  Paper,
  Stack,
  Button,
  Box,
  Group,
  PasswordInput,
  Input,
  Checkbox,
  LoadingOverlay,
  Alert
} from '@mantine/core';
import {MdAlternateEmail} from 'react-icons/md';

interface Props {
  status: string;
}

export default function Login(props: Props) {
  const form = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    form.clearErrors();

    form.post('/login', {
      onFinish: () => form.reset('password'),
    });
  };

  return (
    <AuthenticationLayout>
      <Head title="Log in"/>

      <Title ta='center'>
        مرحبا بك مجددا
      </Title>

      <Text c='dimmed' size='sm' ta='center' mt={5}>
        ليس لديك حساب؟
        {' '}
        <Anchor href='/register' size='sm' component={Link}>
          تسجيل حساب جديد
        </Anchor>
      </Text>

      <Paper pos='relative' withBorder shadow='md' p={30} mt={30} radius='md' w='100%'>
        <LoadingOverlay visible={form.processing} zIndex={1000} overlayProps={{radius: 'sm', blur: 1}}/>
        {props.status && (
          <Alert mb={22} variant='light' color='green'>
            {props.status}
          </Alert>
        )}

        <Box>
          <form onSubmit={submit}>
            <Stack justify='space-between'>
              <Input.Wrapper
                withAsterisk
                label='البريد الالكتروني'
                error={form.errors.email}
              >
                <Input
                  error={form.errors.email}
                  autoFocus
                  className='ltr'
                  value={form.data.email}
                  onChange={(e) => form.setData('email', e.currentTarget.value)}
                  rightSection={<MdAlternateEmail/>}
                />
              </Input.Wrapper>

              <PasswordInput
                error={form.errors.password}
                withAsterisk
                label='كلمة السر'
                type='password'
                value={form.data.password}
                onChange={(e) => form.setData('password', e.currentTarget.value)}
                className='ltr'
              />

              <Group justify='space-between' my='lg'>
                <Checkbox
                  label='تذكرني'
                  checked={form.data.remember}
                  onChange={(e) => form.setData('remember', e.currentTarget.checked ? true : false)}
                  error={form.errors.remember}
                />

                <Anchor component={Link} href='forgot-password' size='sm'>
                  نسيت كلمة السر؟
                </Anchor>
              </Group>

              <Button
                fullWidth
                loading={form.processing}
                disabled={form.processing}
                type='submit'
              >
                تسجيل الدخول
              </Button>
            </Stack>
          </form>
        </Box>
      </Paper>
    </AuthenticationLayout>
  );
}
