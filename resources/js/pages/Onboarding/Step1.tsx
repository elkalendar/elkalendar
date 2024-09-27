import React from 'react';
import OnboardingLayout from '../../layouts/OnboardingLayout';
import classes from "@/pages/Onboarding/classes.module.css";
import {Button, Flex, Group, Select, Text, TextInput, Title} from "@mantine/core";
import {useForm} from "@inertiajs/inertia-react";
import useTypedPage from "@/hooks/useTypedPage";
import useSuccessToast from "@/hooks/useSuccessToast";
import {Country, OnboardingStep} from "@/types/entities";
import {useTranslation} from "react-i18next";
import TimezoneSelector from '@/components/TimezoneSelector';

interface Props {
  countries: Country[];
  timezones: any;
  onboarding: {
    finished: boolean;
    currentStep: number;
    steps: OnboardingStep[];
  }
}

function Step1(props: Props) {
  const {t} = useTranslation();
  const successToast = useSuccessToast();
  const page = useTypedPage();
  const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'Africa/Cairo';

  const form = useForm({
    username: page.props.auth.user.username ?? '',
    timezone: browserTimezone,
    timeFormat: page.props.auth.user.timeFormat,
    country: page.props.auth.user.country,
  });

  return (
    <OnboardingLayout title={props.onboarding.steps[props.onboarding.currentStep].title}>
      <>
        <Flex direction="column" gap={22}>
          <Title size='md' mb={22}>
            {props.onboarding.steps[props.onboarding.currentStep].title}
          </Title>

          <Flex direction="column">
            <TextInput
              label={t('onboarding.username')}
              withAsterisk
              description={t('onboarding.username_desc')}
              error={form.errors.username}
              width={125}
              value={form.data.username}
              onChange={(e) => form.setData('username', e.currentTarget.value)}
              className='ltr'
              placeholder='john-doe'
            />

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
              {page.props.appUrl}/
              {form.data.username}
            </Text>
          </Flex>

          <Select
            error={form.errors.country}
            defaultValue={page.props.auth.user.country}
            searchable
            label={t('onboarding.country')}
            description={t('onboarding.country_desc')}
            data={props.countries.map((country) => ({
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
            timezones={props.timezones}
            onChange={(timezone) => {
              form.setData('timezone', timezone);
            }}
          />

          <Select
            error={form.errors.timeFormat}
            value={form.data.timeFormat}
            defaultValue={page.props.auth.user.timeFormat}
            allowDeselect={false}
            label={t('onboarding.timeformat')}
            description={t('onboarding.timeformat_desc')}
            data={[
              {value: '12', label: '12 ' + t('onboarding.hour')},
              {value: '24', label: '24 ' + t('onboarding.hour')},
            ]}
            onChange={(value) => form.setData('timeFormat', value)}
          />
        </Flex>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{from: 'blue', to: 'cyan'}}
            onClick={() => {
              form.clearErrors();
              form.post('/onboarding/step1', {
                preserveScroll: true,
                onSuccess: () => {
                  successToast()
                }
              })
            }}
          >
            {t('onboarding.next')}
          </Button>
        </Group>
      </>
    </OnboardingLayout>
  );
}

export default Step1;
