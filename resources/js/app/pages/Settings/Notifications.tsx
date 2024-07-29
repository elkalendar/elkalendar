import React from 'react';
import SettingsLayout from '@/layouts/SettingsLayout';
import PageHeader from '@/components/PageHeader/PageHeader';
import useTypedPage from '@/hooks/useTypedPage';

export default function () {
  const page = useTypedPage();

  return (
    <SettingsLayout
      title="الاشعارات"
      renderHeader={() => (
        <PageHeader
          title="الاشعارات"
          subtitle="تحكم في الاشعارات التي تصلك من التطبيق"
        />
      )}
    />
  );
}
