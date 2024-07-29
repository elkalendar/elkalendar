import React from 'react';
import OnboardingLayout from '../../layouts/OnboardingLayout';
import classes from "@/pages/Onboarding/classes.module.css";
import {Button, Flex, Group, Input, Select, Text, Title} from "@mantine/core";
import {showSuccessToast} from "@/utils/FormHelpers";
import SlugInput from "@/components/SlugInput";
import {useForm} from "@inertiajs/inertia-react";
import useTypedPage from "@/hooks/useTypedPage";
import TimezoneSelector from "@/components/TimezoneSelector";

function Step1() {
  const page = useTypedPage();
  const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'Africa/Cairo';

  const form = useForm({
    username: page.props.auth.user.data.username,
    timezone: browserTimezone,
    timeFormat: page.props.auth.user.data.timeFormat,
    country: page.props.auth.user.data.country,
  });


  return (
    <OnboardingLayout title='البيانات الاساسية'>
      <Flex direction="column" gap={22}>
        <Title size='md' mb={22}>
          {page.props.onboarding.steps[page.props.onboarding.currentStep].title}
        </Title>

        <Flex direction="column">
          <Input.Wrapper
            withAsterisk
            label="اسم المستخدم"
            description="قم باختيار اسم مستخدم مميز حيث انه سيكون المعرف الخاص بك في رابط الكالندر."
          >
            <SlugInput
              error={form.errors.username}
              width={125}
              prefix="https://elkalendar.com/"
              value={form.data.username}
              onChange={(e) => form.setData('username', e.currentTarget.value)}
            />
          </Input.Wrapper>

          <Text
            size="sm"
            c="gray.3"
            styles={{
              root: {
                textAlign: 'left',
                padding: '0.5rem 0',
                direction: 'ltr'
              },
            }}
          >
            https://elkalendar.com/
            {form.data.username}
          </Text>
        </Flex>

        <Select
          error={form.errors.country}
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

        <TimezoneSelector
          error={form.errors.timezone}
          is24Hours={false}
          defaultTimezone={form.data.timezone}
          selectedTimezone={form.data.timezone}
          timezones={page.props.timezones}
          onChange={(timezone) => {
            form.setData('timezone', timezone);
          }}
        />

        <Select
          error={form.errors.timeFormat}
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
      </Flex>

      <Group className={classes.controls}>
        <Button
          size="xl"
          className={classes.control}
          variant="gradient"
          gradient={{from: 'blue', to: 'cyan'}}
          onClick={() => {
            form.submit('post', '/onboarding/step1', {
              preserveScroll: true,
              onSuccess: () => {
                showSuccessToast('تم تحديث البيانات بنجاح')
              }
            })
          }}
        >
          التالي
        </Button>
      </Group>
    </OnboardingLayout>
  );
}

export default Step1;
