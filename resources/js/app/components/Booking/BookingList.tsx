import React from 'react';
import {Flex, Pagination} from '@mantine/core';
import BookingRawNew from '@/components/Booking/BookingItem';
import {Inertia} from "@inertiajs/inertia";
import qs from "query-string";

interface BookingListProps {
  children?: React.ReactNode;
  bookings: any;
  hasPagination?: boolean;
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
            total={props.bookings.meta.last_page}
            value={props.bookings.meta.current_page}
            onChange={(value) => Inertia.get(`/bookings?filterBy=${filterBy}&page=${value}`)}
          />

        )
      }
    </Flex>
  );
}
