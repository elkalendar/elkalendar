import React from 'react';
import {Group, SegmentedControl} from '@mantine/core';
import {Inertia} from '@inertiajs/inertia';
import qs from "query-string";
import {useTranslation} from "react-i18next";

export default function () {
  const {t} = useTranslation();
  const query = qs.parse(location.search);
  const filter: string = query.filter ?? 'future';

  return (
    <Group mb={32}>
      <SegmentedControl
        value={filter}
        onChange={(value) => {
          Inertia.visit(`/bookings?filter=${value}`, {
            preserveScroll: true,
          });
        }}
        data={[
          {label: t('bookings.filter_future'), value: 'future'},
          {label: t('bookings.filter_past'), value: 'past'},
          {label: t('bookings.filter_cancelled'), value: 'cancelled'},
        ]}
      />
    </Group>
  );
}
