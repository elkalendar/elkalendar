import React from 'react';
import { Button } from '@mantine/core';
import { BiPlus } from 'react-icons/bi';
import { InertiaLink } from '@inertiajs/inertia-react';
import { BsFillCalendarFill } from 'react-icons/bs';
import PageHeader from '@/components/PageHeader/PageHeader';
import SettingsLayout from '@/layouts/SettingsLayout';
import NoResults from '@/components/NoResults/NoResults';
import useTypedPage from '@/hooks/useTypedPage';

interface CalendarProps {
}

export default function Calendars(props: CalendarProps) {
  const page = useTypedPage();

  const headerAction = (
    <Button
      leftSection={<BiPlus />}
      component={InertiaLink}
      variant="outline"
      href="/apps/calendar"
    >
      اضافة تقويم
    </Button>
  );

  return (
    <SettingsLayout
      title="التقويمات"
      renderHeader={() => (
        <PageHeader
          title="التقويمات"
          subtitle="قم بتخصيص كيفية تفاعل اجتماعاتك وحجوزاتك مع التقويمات الخاصة بك"
          leftSection={headerAction}
        />
      )}
    >
      <NoResults
        icon={<BsFillCalendarFill size="3rem" />}
        title="لم تقم بإضافة أي تقويمات"
        subtitle="قم بإضافة تقويماتك الخاصة لتتمكن من إضافة الأحداث والمهام والمواعيد"
        action={headerAction}
      />
    </SettingsLayout>
  );
}
