import { format } from 'date-fns';
import dayjs from 'dayjs';
import { DatePicker } from '@mantine/dates';
import React from 'react';
import 'dayjs/locale/ar';
import '@mantine/dates/styles.css';
import {
  Box, Button, Flex, LoadingOverlay, Overlay, Text,
} from '@mantine/core';

interface EventBookingCalendarProps {
  selectedDate?: Date;
  selectedMonth: Date;
  onMonthChange: (n: Date) => void;
  onChange: (value: Date) => void;
  days: any;
  isLoading?: boolean;
  maxDate?: Date;
  availability?: [];
}

export function EventBookingCalendar(props: EventBookingCalendarProps) {
  const defaultMaxDate = dayjs(new Date()).endOf('year').add(1, 'years').toDate();

  const hasAvailability = () => Object.keys(props.days).length > 0;

  return (
    <Box pos="relative">
      <DatePicker
        minDate={new Date()}
        maxDate={props.maxDate ?? defaultMaxDate}
        maxLevel="month"
        value={props.selectedDate}
        month={props.selectedMonth}
        defaultDate={props.selectedMonth}
        locale="ar"
        size="md"
        onChange={(value) => props.onChange(value)}
        onNextMonth={(n) => props.onMonthChange(n)}
        onPreviousMonth={(n) => props.onMonthChange(n)}
        excludeDate={(date) => !Object.keys(props.days).includes(format(date, 'yyy-MM-dd'))}
      />

      <LoadingOverlay visible={props.isLoading} zIndex={1000} blur={20} />

      {
      (
        !hasAvailability() && !props.isLoading
      ) && (
      <Overlay
        zIndex={1000}
        blur={2}
      >
        <Flex gap={22} justify="center" direction="column" align="center" wrap="wrap" h="100%">
          <Text size="sm">لا يوجد مواعيد متاحة في هذا الشهر!</Text>
          <Button onClick={() => props.onMonthChange(dayjs(props.selectedMonth).add(1, 'month').toDate())} variant="outline">
            عرض الشهر التالي
          </Button>
        </Flex>
      </Overlay>
      )
    }
    </Box>
  );
}
