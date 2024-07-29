import React, {useState} from 'react';
import {Button, Tabs,} from '@mantine/core';
import {Inertia} from '@inertiajs/inertia';
import {BiLinkExternal} from 'react-icons/bi';
import AppLayout from '@/layouts/AppLayout';
import PageHeader from '@/components/PageHeader/PageHeader';
import Setup from '@/components/Events/Form/Setup';
import EventLocations from '@/components/Events/Form/EventLocations';
import EventAvailability from '@/components/Events/Form/EventAvailability';
import BackButton from '@/components/BackButton';

export default function Create(props) {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const [activeTab, setActiveTab] = useState(url.href.split('#')[1] ?? 'setup');

  return (
    <AppLayout
      title={`تعديل اجتماع:${props.event.data.name}`}
      renderHeader={() => (
        <PageHeader
          title={`تعديل اجتماع:${props.event.data.name}`}
          rightSection={<BackButton href="/events"/>}
          leftSection={(
            <Button
              component="a"
              href={props.event.data.link}
              target="_blank"
              variant="subtle"
              leftSection={<BiLinkExternal/>}
            >
              معاينة الاجتماع
            </Button>
          )}
        />
      )}
    >
      <Tabs
        color="teal"
        value={activeTab}
        onChange={(value) => {
          Inertia.visit(`/events/${props.event.data.id}/edit#${value}`, {
            preserveScroll: true,
            preserveState: (page) => Object.keys(page.props.errors).length,
            onSuccess: () => {
              setActiveTab(value);
            },
          });
        }}
      >
        <Tabs.List mb={12}>
          <Tabs.Tab value="setup">بيانات الاجتماع</Tabs.Tab>
          <Tabs.Tab value="locations">مكان المقابلة</Tabs.Tab>
          <Tabs.Tab value="availability">المواعيد المتاحة</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="setup" pt="xs">
          <Setup event={props.event.data}/>
        </Tabs.Panel>

        <Tabs.Panel value="locations" pt="xs">
          <EventLocations event={props.event.data}/>
        </Tabs.Panel>

        <Tabs.Panel value="availability" pt="xs">
          <EventAvailability event={props.event.data}/>
        </Tabs.Panel>
      </Tabs>

    </AppLayout>
  );
}
