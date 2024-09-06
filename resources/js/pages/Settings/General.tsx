import React from 'react';
import {Button, Flex, Select, Switch,} from '@mantine/core';
import {FaSave} from 'react-icons/fa';
import {useForm} from '@inertiajs/inertia-react';
import SettingsLayout from '@/layouts/SettingsLayout';
import PageHeader from '@/components/PageHeader/PageHeader';
import useTypedPage from '@/hooks/useTypedPage';
import {useTranslation} from "react-i18next";
import {Country} from "@/types/entities";

interface Props {
  languages: [];
  countries: Country[]
}

export default function General(props: Props) {
  const {t} = useTranslation();
  const page = useTypedPage();

  const form = useForm({
    language: page.props.auth.user.language,
    timeFormat: page.props.auth.user.timeFormat,
    allowSeoIndexing: page.props.auth.user.allowSeoIndexing,
    country: page.props.auth.user.country,
  });

  return (
    <SettingsLayout
      title={t('settings.general')}
      renderHeader={() => (
        <PageHeader
          title={t('settings.general')}
          subtitle={t('settings.general_subtitle')}
        />
      )}
    >
      <Flex gap={22} direction="column">
        <Select
          value={form.data.language}
          defaultValue={page.props.auth.user.language}
          allowDeselect={false}
          label={t('settings.forms.general.lang')}
          description={t('settings.forms.general.lang_desc')}
          data={Object.keys(props.languages).map((languageKey, index) => {
            return {value: languageKey, label: props.languages[languageKey].native};
          })}
          onChange={(value) => form.setData('language', value)}
          error={form.errors.language}
        />

        <Select
          error={form.errors.timeFormat}
          value={form.data.timeFormat}
          defaultValue={page.props.auth.user.timeFormat}
          allowDeselect={false}
          label={t('settings.forms.general.time_format')}
          description={t('settings.forms.general.time_format_desc')}
          data={[
            {value: '12', label: '12 ' + t('settings.forms.general.hour')},
            {value: '24', label: '24 ' + t('settings.forms.general.hour')},
          ]}
          onChange={(value) => form.setData('timeFormat', value)}
        />

        <Select
          defaultValue={page.props.auth.user.country}
          searchable
          label={t('settings.forms.general.country')}
          description={t('settings.forms.general.country_desc')}
          data={props.countries.map((country) => ({
            label: `${country.name_ar} (${country.name_native})`,
            value: country.code,
          }))}
          onChange={(value) => form.setData('country', value)}
          error={form.errors.country}
        />

        <Switch
          checked={form.data.allowSeoIndexing}
          defaultChecked
          onChange={(event) => form.setData('allowSeoIndexing', !form.data.allowSeoIndexing)}
          label={t('settings.forms.general.seo')}
          description={t('settings.forms.general.seo_desc')}
          error={form.errors.allowSeoIndexing}
        />

        <div className="actions mt-12">
          <Button
            disabled={!form.isDirty || form.processing}
            leftSection={<FaSave/>}
            onClick={() => form.post('/settings/general', {
              onSuccess: () => {
                location.reload()
              },
            })}
          >
            {t('btn.save')}
          </Button>
        </div>
      </Flex>
    </SettingsLayout>
  );
}
