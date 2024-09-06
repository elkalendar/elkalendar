import {Head, Link, useForm} from '@inertiajs/inertia-react';
import React from 'react';
import {
  Alert, Anchor, Button, Stack, Text,
} from '@mantine/core';
import AuthenticationLayout from '@/layouts/AuthenticationLayout';
import {useTranslation} from "react-i18next";

interface Props {
  status: string;
}

export default function VerifyEmail({status}: Props) {
  const {t} = useTranslation();
  const form = useForm({});
  const verificationLinkSent = status === 'verification-link-sent';

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post('/email/verification-notification');
  }

  return (
    <AuthenticationLayout>
      <Head title={t('auth.email.verify_title')}/>

      <Stack justify="space-between">
        <Text size="sm" mb={22}>
          {t('auth.email.description')}
        </Text>

        {verificationLinkSent && (
          <Alert variant="light" color="green">
            {t('auth.email.link_sent')}
          </Alert>
        )}

        <Button
          loading={form.processing}
          disabled={form.processing}
          onClick={onSubmit}
        >
          {t('auth.email.btn_send_verification_link')}
        </Button>

        <Anchor
          href="/logout"
          component={Link}
        >
          {t('auth.logout')}
        </Anchor>
      </Stack>
    </AuthenticationLayout>
  );
}
