import React from 'react';
import {Button, Flex, Select, Switch,} from '@mantine/core';
import {FaSave} from 'react-icons/fa';
import {useForm} from '@inertiajs/inertia-react';
import SettingsLayout from '@/layouts/SettingsLayout';
import PageHeader from '@/components/PageHeader/PageHeader';
import useTypedPage from '@/hooks/useTypedPage';
import {showSuccessToast} from '@/utils/FormHelpers';

export default function General() {
  const page = useTypedPage();

  const form = useForm({
    timeFormat: page.props.auth.user.data.timeFormat,
    allowSeoIndexing: page.props.auth.user.data.allowSeoIndexing,
    country: page.props.auth.user.data.country,
  });

  return (
    <SettingsLayout
      title="الاعدادات العامة"
      renderHeader={() => (
        <PageHeader
          title="الاعدادات العامة"
          subtitle="إدارة الإعدادات للغتك والمنطقة الزمنية"
        />
      )}
    >
      <Flex gap={22} direction="column">
        <Select
          value={form.data.timeFormat}
          defaultValue={page.props.auth.user.data.timeFormat}
          allowDeselect={false}
          label="صيغة الوقت"
          description="يعد هذا إعدادًا داخليًا ولن يؤثر على كيفية عرض الأوقات على صفحات الحجز العامة لك أو لأي شخص يقوم بحجزك."
          data={[
            {value: '12', label: '12 ساعة'},
            {value: '24', label: '24 ساعة'},
          ]}
          onChange={(value) => form.setData({timeFormat: value})}
        />

        <Select
          defaultValue={page.props.auth.user.data.country}
          searchable
          label="الدولة"
          description="يستخدم هذا الإعداد لتحديد دولتك داخل نظام الكالندر"
          data={page.props.countries.map((country) => ({
            label: `${country.name_ar} (${country.name_native})`,
            value: country.code,
          }))}
          onChange={(value) => form.setData('country', value)}
        />

        <Switch
          checked={form.data.allowSeoIndexing}
          defaultChecked
          onChange={(event) => form.setData('allowSeoIndexing', !form.data.allowSeoIndexing)}
          label="السماح بفهرسة SEO"
          description="السماح لمحركات البحث بالوصول إلى المحتوى العام الخاص بك"
        />

        <div className="actions mt-12">
          <Button
            disabled={!form.isDirty || form.processing}
            leftSection={<FaSave/>}
            onClick={() => form.post('/settings/general', {
              preserveScroll: true,
              preserveState: (page) => Object.keys(page.props.errors).length,
              onSuccess: () => {
                showSuccessToast();
              },
            })}
          >
            حفظ الاعدادات
          </Button>
        </div>
      </Flex>
    </SettingsLayout>
  );
}
