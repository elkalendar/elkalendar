import React from 'react';
import { BsCalendar } from 'react-icons/bs';
import AppLayout from '@/layouts/AppLayout';
import PageHeader from '@/components/PageHeader/PageHeader';
import NoResults from '@/components/NoResults/NoResults';
import BookingFilters from '@/components/Booking/BookingFilters';
import BookingTable from '@/components/Booking/BookingList';
import {Booking} from "@/types/entities";
import {useTranslation} from "react-i18next";

interface Props {
    bookings: {
        data: Booking[];
        meta: object;
        links: object;
    }
}

export default (props: Props) => {
  const {t} = useTranslation();

  return (
    <AppLayout
      title={t('bookings.title')}
      renderHeader={() => (
        <PageHeader
          title={t('bookings.title')}
          subtitle={t('bookings.sub_title')}
        />
      )}
    >
      <div className="flex flex-col gap-6">
        <BookingFilters />

        {
          props.bookings.data.length < 1 ? (
            <NoResults
              title={t('bookings.no_bookings')}
              subtitle={t('bookings.no_bookings_desc')}
              icon={<BsCalendar size="3rem" />}
            />
          ) : <BookingTable
              meta={{
                  currentPage: props.bookings.meta.current_page,
                  lastPage: props.bookings.meta.last_page,
              }}
              hasPagination={true}
              bookings={props.bookings}
          />
        }

      </div>
    </AppLayout>
  );
}
