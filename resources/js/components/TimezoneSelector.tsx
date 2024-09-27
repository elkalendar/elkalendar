import {Group, Select, SelectProps, useMantineTheme} from '@mantine/core';
import React, {useEffect, useState} from 'react';
import {formatTime, getTimeFormat} from '@/utils/DateTimeHelpers';
import {useTranslation} from "react-i18next";
import {formatInTimeZone} from "date-fns-tz";
import {ar} from "date-fns/locale";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";

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

export default function (props: TimezoneSelectorProps) {
  const dateFnsLocale = useDateFnsLocale();
  const {t} = useTranslation();
  const [selectedTimezone, setSelectedTimezone] = useState(props.selectedTimezone);
  const [currentTime, setCurrentTime] = useState(new Date());
  const theme = useMantineTheme();

  useEffect(() => {
    setTimeout(() => {
      setCurrentTime(new Date());
    }, 1000)
  }, [currentTime])

  const selectedStyle = {
    backgroundColor: theme.colors.gray[2]
  };

  const renderSelectOption: SelectProps['renderOption'] = ({option, checked}) => (
    <Group
      flex="1"
      gap="xs"
      justify='space-between'
      style={checked ? selectedStyle : {}}

    >
      <span>{option.label}</span>
      <span>
        {
          formatInTimeZone(currentTime, option.value, getTimeFormat(props.is24Hours), {
            locale: dateFnsLocale,
          })
        }
      </span>
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
