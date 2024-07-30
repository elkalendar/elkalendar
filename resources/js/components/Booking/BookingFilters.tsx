import React from 'react';
import {Group, SegmentedControl} from '@mantine/core';
import {Inertia} from '@inertiajs/inertia';
import qs from "query-string";

export default function () {
  const query = qs.parse(location.search);
  const filterBy: string = query.filterBy ?? 'future';

  return (
    <Group mb={32}>
      <SegmentedControl
        value={filterBy}
        onChange={(value) => {
          Inertia.visit(`/bookings?filterBy=${value}`, {
            preserveScroll: true,
          });
        }}
        data={[
          {label: 'الحجوزات الحالية', value: 'future'},
          {label: 'الحجوزات الماضية', value: 'past'},
          {label: 'الحجوزات الملغية', value: 'cancelled'},
        ]}
      />
    </Group>
  );
}
