import {Group, SegmentedControl} from "@mantine/core";
import React from "react";
import {useTranslation} from "react-i18next";

interface Props {
  is24Hours: boolean;
  onChange: (value: string) => void;
}

export const TimeFormatSwitcher = (props: Props) => {
  const {t} = useTranslation();

  return (
    <Group px={22}>
      <SegmentedControl
        value={props.is24Hours ? '24' : '12'}
        onChange={props.onChange}
        data={[
          {label: t('public.time_format_24'), value: '24'},
          {label: t('public.time_format_12'), value: '12'},
        ]}
      />
    </Group>
  );
};
