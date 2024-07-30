import React from 'react';
import { BsCalendar } from 'react-icons/bs';
import AppLayout from '@/layouts/AppLayout';
import PageHeader from '@/components/PageHeader/PageHeader';
import NoResults from '@/components/NoResults/NoResults';
import BookingFilters from '@/components/Booking/BookingFilters';
import BookingTable from '@/components/Booking/BookingList';

export default function Dashboard(props) {
  return (
    <AppLayout
      title="الحجوزات"
      renderHeader={() => (
        <PageHeader
          title="الحجوزات"
          subtitle="شاهد الحجوزات القادمة والماضية التي تم حجزها من خلال روابط الاجتماعات الخاصة بك."
        />
      )}
    >
      <div className="flex flex-col gap-6">
        <BookingFilters />

        {
          props.bookings.data.length < 1 ? (
            <NoResults
              title="لا يوجد حجوزات"
              subtitle="ليس لديك أي حجوزات. بمجرد قيام شخص ما بحجز موعد معك، سيظهر هنا."
              icon={<BsCalendar size="3rem" />}
            />
          ) : <BookingTable hasPagination={true} bookings={props.bookings} />
        }

      </div>
    </AppLayout>
  );
}
