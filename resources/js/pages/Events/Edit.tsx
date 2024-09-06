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
import {Event, Schedule} from "@/types/entities";
import {useTranslation} from "react-i18next";

interface Props {
  event: Event;
  schedules: Schedule[];
}

export default function Create(props: Props) {
  const {t} = useTranslation();
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const [activeTab, setActiveTab] = useState(url.href.split('#')[1] ?? 'setup');

  return (
    <AppLayout
      title={t('event.edit.title') + ` :${props.event.name}`}
      renderHeader={() => (
        <PageHeader
          title={t('event.edit.title') + `: ${props.event.name}`}
          rightSection={<BackButton href="/events"/>}
          leftSection={(
            <Button
              component="a"
              href={props.event.link}
              target="_blank"
              variant="subtle"
              leftSection={<BiLinkExternal/>}
            >
              {t('btn.preview')}
            </Button>
          )}
        />
      )}
    >
      <Tabs
        color="teal"
        value={activeTab}
        onChange={(value) => {
          Inertia.visit(`/events/${props.event.id}/edit#${value}`, {
            preserveScroll: true,
            onSuccess: () => {
              setActiveTab(value);
            },
          });
        }}
      >
        <Tabs.List mb={12}>
          <Tabs.Tab value="setup">
            {t('event.edit.setup')}
          </Tabs.Tab>
          <Tabs.Tab value="locations">
            {t('event.edit.locations')}
          </Tabs.Tab>
          <Tabs.Tab value="availability">
            {t('event.edit.availability')}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="setup" pt="xs">
          <Setup event={props.event}/>
        </Tabs.Panel>

        <Tabs.Panel value="locations" pt="xs">
          <EventLocations event={props.event}/>
        </Tabs.Panel>

        <Tabs.Panel value="availability" pt="xs">
          <EventAvailability
            event={props.event}
            schedules={props.schedules}
          />
        </Tabs.Panel>
      </Tabs>

    </AppLayout>
  );
}
