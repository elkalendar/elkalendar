import {Head, Link, useForm} from '@inertiajs/inertia-react';
import React from 'react';
import {
  Alert, Anchor, Button, Stack, Text,
} from '@mantine/core';
import AuthenticationLayout from '@/layouts/AuthenticationLayout';

interface Props {
  status: string;
}

export default function VerifyEmail({status}: Props) {
  const form = useForm({});
  const verificationLinkSent = status === 'verification-link-sent';

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post('/email/verification-notification');
  }

  return (
    <AuthenticationLayout>
      <Head title="تأكيد البريد الالكتروني"/>

      <Stack justify="space-between">
        <Text size="sm" mb={22}>
          شكرا لتسجيلك! قبل البدء، هل يمكنك التحقق من حسابك
          عنوان البريد الإلكتروني من خلال النقر على الرابط الذي أرسلناه إليك عبر البريد الإلكتروني للتو؟ اذا أنت
          لم نتلق البريد الإلكتروني، سنرسل لك بكل سرور رسالة أخرى.
        </Text>

        {verificationLinkSent && (
          <Alert variant="light" color="green">
            تم إرسال رابط تحقق جديد إلى عنوان بريدك الإلكتروني
            المقدمة أثناء التسجيل.
          </Alert>
        )}

        <Button
          loading={form.processing}
          disabled={form.processing}
          onClick={onSubmit}
        >
          إعادة ارسال بريد التحقق
        </Button>

        <Anchor
          href="/logout"
          component={Link}
        >
          تسجيل خروج
        </Anchor>
      </Stack>
    </AuthenticationLayout>
  );
}
