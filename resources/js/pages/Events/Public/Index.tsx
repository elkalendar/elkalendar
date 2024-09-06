import React from 'react';
import {Head} from '@inertiajs/inertia-react';
import {Avatar, Box, Container, Group, Stack, Title,} from '@mantine/core';
import {BiCalendar} from 'react-icons/bi';
import EventListCard from '@/components/Events/EventListCard';
import {UserPublic, Event} from '@/types/entities';
import NoResults from '@/components/NoResults/NoResults';
import {useTranslation} from "react-i18next";

interface EventsProps {
  user: UserPublic;
  events: Event[];
  displayEventsAs: string;
}

export default function Index(props: EventsProps) {
  const {t} = useTranslation();

  return (
    <div>
      <Container
        pt={88}
        size="md"
      >
        {
          !props.user.settings.allowSeoIndexing ? (
            <Head>
              <title>{props.user.name}</title>
              <meta name="robots" content="noindex, nofollow"/>
              <meta name="googlebot" content="noindex"/>
              <meta name="googlebot-news" content="nosnippet"/>
            </Head>
          ) : <Head title={props.user.name}/>
        }

        <Stack align="center" w='100%'>
          <Avatar size="lg" src={props.user.avatar} alt={`${props.user.name}'s avatar`}/>

          <Title size="md">{props.user.name}</Title>

          <Group ta='center' justify='center' w='100%'>
            <Box w='100%'
                 dangerouslySetInnerHTML={{__html: props.user.profileMessage.replace(/(?:\r\n|\n|\r)/g, '<br/>')}}/>
          </Group>

          {
            props.events.length < 1 && (
              <NoResults
                icon={<BiCalendar/>}
                title={t('public.no_events')}
              />
            )
          }

          {
            props.events.map((event, index) => (
              <EventListCard
                key={index}
                event={event}
                username={props.user.username}
              />
            ))
          }
        </Stack>
      </Container>
    </div>
  );
}
