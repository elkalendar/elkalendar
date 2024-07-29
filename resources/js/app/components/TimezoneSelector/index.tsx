import { Select } from '@mantine/core';
import React, { forwardRef, useState } from 'react';
import { formatTime } from '@/utils/DateTimeHelpers';

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
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
}

export default function (props: TimezoneSelectorProps) {
  const [selectedTimezone, setSelectedTimezone] = useState(props.selectedTimezone);

  const Item = forwardRef<HTMLDivElement, ItemProps>(
    ({ label, ...others }: ItemProps, ref) => (
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

  return (
    <Select
      w="100%"
      label="التوقيت الزمني"
      description="أختر التوقيت الزمني الخاص بك"
      searchable
      className="w-full"
      nothingFoundMessage="لا يوجد نتائج"
      placeholder="أختر التوقيت الزمني"
      data={props.timezones}
      defaultValue={selectedTimezone}
      onChange={(timezone: string) => {
        setSelectedTimezone(timezone);
        props.onChange(timezone);
      }}
    />
  );
}
