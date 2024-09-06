import React from 'react';
import {Flex, Pagination} from '@mantine/core';
import BookingRawNew from '@/components/Booking/BookingItem';
import {Inertia} from "@inertiajs/inertia";
import qs from "query-string";

interface BookingListProps {
  children?: React.ReactNode;
  bookings: any;
  hasPagination?: boolean;
  meta?: {
      lastPage: number;
      currentPage: number;
  }
}

export default function (props: BookingListProps) {
  const query = qs.parse(location.search);
  const filterBy = query.filterBy ?? 'future';
  const hasPagination = props.hasPagination ?? false;

  return (
    <Flex direction="column">
      {
        props.bookings.data.length > 0 && props.bookings.data.map((booking: any, index: number) => <BookingRawNew key={index} booking={booking} />)
      }

      {
        hasPagination && (
          <Pagination
            total={props.meta.lastPage}
            value={props.meta.currentPage}
            onChange={(value) => Inertia.get(`/bookings?filterBy=${filterBy}&page=${value}`)}
          />
        )
      }
    </Flex>
  );
}
