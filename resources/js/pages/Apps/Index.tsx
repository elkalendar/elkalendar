import React from 'react';
import {Grid, Group, SegmentedControl,} from '@mantine/core';
import {Inertia} from '@inertiajs/inertia';
import {ImNotification} from 'react-icons/im';
import AppLayout from '@/layouts/AppLayout';
import PageHeader from '@/components/PageHeader/PageHeader';
import useTypedPage from '@/hooks/useTypedPage';
import {App} from '@/types/entities';
import NoResults from '@/components/NoResults/NoResults';
import AppCard from '@/components/AppCard';

export default function Dashboard() {
  const page = useTypedPage();

  const apps: App[] = page.props.apps.data;

  const getCategoriesArray = () => {
    const arr = [{
      value: 'all',
      label: 'الكل',
    }];

    Object.keys(page.props.categories).map((key: any) => {
      arr.push({
        value: key,
        label: page.props.categories[key],
      });
    });

    return arr;
  };

  return (
    <AppLayout
      title="التطبيقات"
      renderHeader={() => (
        <PageHeader
          title="التطبيقات"
          subtitle="ربط حساباتك وتطبيقاتك المختلفة مع حساب الكالندر."
        />
      )}
    >
      <Group mb={22}>
        <SegmentedControl
          value={page.props.category ?? 'all'}
          data={getCategoriesArray()}
          onChange={(value) => {
            Inertia.visit(`/apps/${value}`, {
              preserveScroll: true,
            });
          }}
        />
      </Group>

      {apps.length > 0 ? (
        <Grid>
          {
            apps.map((app: any, index: number) => <AppCard key={index} app={app}/>)
          }
        </Grid>
      ) : (
        <NoResults
          icon={<ImNotification size={44}/>}
          title="لا يوجد تطبيقات"
          subtitle="لا يوجد تطبيقات متاحة حالياً."
        />
      )}
    </AppLayout>
  );
}
