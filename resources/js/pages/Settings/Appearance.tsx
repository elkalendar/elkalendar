import React from 'react';
import {Button, Flex, Group, Radio,} from '@mantine/core';
import {FaSave} from 'react-icons/fa';
import {useForm} from '@inertiajs/inertia-react';
import SettingsLayout from '@/layouts/SettingsLayout';
import PageHeader from '@/components/PageHeader/PageHeader';
import useTypedPage from '@/hooks/useTypedPage';
import {showSuccessToast} from '@/utils/FormHelpers';

export default function Appearance() {
  const page = useTypedPage();

  const form = useForm({
    theme: page.props.auth.user.data.theme,
  });

  return (
    <SettingsLayout
      title="المظهر والالوان"
      renderHeader={() => (
        <PageHeader
          title="المظهر والالوان"
          subtitle="تغيير مظهر والوان النظام وطريقة عرض صفحتك الشخصية"
        />
      )}
    >
      <Flex gap={22} direction="column">
        <Radio.Group
          name="favoriteFramework"
          label="مظهر ولون التطبيق"
          description="ينطبق هذا الخيار على لون واجهة المستخدم الخاصة بتطبيق الكالندر المفضلة لك"
          withAsterisk
          value={form.data.theme}
          onChange={(theme) => {
            form.setData({theme});
          }}
        >
          <Group mt="xs">
            <Radio value="dark" label="غامق"/>
            <Radio value="light" label="فاتح"/>
            <Radio value="system" label="طبقاً لنظام التشغيل"/>
          </Group>
        </Radio.Group>
      </Flex>

      <Group mt={32}>
        <Button
          disabled={!form.isDirty || form.processing}
          leftSection={<FaSave/>}
          onClick={() => form.post('/settings/appearance', {
            preserveScroll: true,
            preserveState: (page) => Object.keys(page.props.errors).length,
            onSuccess: () => {
              showSuccessToast();
              window.location.reload();
            },
          })}
        >
          حفظ الاعدادات
        </Button>
      </Group>
    </SettingsLayout>
  );
}
