import {Group, Select, SelectProps} from '@mantine/core';
import React, {forwardRef, useState} from 'react';
import {formatTime} from '@/utils/DateTimeHelpers';
import {useTranslation} from "react-i18next";

export interface Timezone {
  value: string;
  label: string;
}

export interface TimezoneSelectorProps {
  is24Hours: boolean;
  defaultTimezone: string;
  selectedTimezone: string;
  timezones: Timezone[];
  onChange: (timezone: string) => void;
  error?: string;
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
}

export default function (props: TimezoneSelectorProps) {
  const {t} = useTranslation();
  const [selectedTimezone, setSelectedTimezone] = useState(props.selectedTimezone);

  const Item = forwardRef<HTMLDivElement, ItemProps>(
    ({label, ...others}: ItemProps, ref) => (
      <div
        {...others}
        ref={ref}
        className={`flex justify-between p-2 rounded-sm hover:cursor-pointer ${selectedTimezone === label ? 'bg-amber-100 dark:bg-amber-900' : 'hover:bg-amber-50 dark:hover:bg-amber-700 mb-0.5'}`}
      >
        <span className="text-sm">{label}</span>
        <span
          className="text-sm text-slate-400 dark:text-white"
        >
          {formatTime(new Date(), label, props.is24Hours)}
        </span>
      </div>
    ),
  );

  const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }) => (
    <Group flex="1" gap="xs" justify='space-between'>
      <span>{option.label}</span>
      <span>{formatTime(new Date(), option.label, props.is24Hours)}</span>
    </Group>
  );

  return (
    <Select
      error={props.error}
      w="100%"
      label={t('forms.booking.timezone_label')}
      description={t('forms.booking.timezone_description')}
      searchable
      className="w-full"
      nothingFoundMessage={t('forms.booking.timezone_no_result')}
      placeholder={t('forms.booking.timezone_placeholder')}
      data={props.timezones}
      defaultValue={selectedTimezone}
      onChange={(timezone: string) => {
        setSelectedTimezone(timezone);
        props.onChange(timezone);
      }}
      renderOption={renderSelectOption}
    />
  );
}
