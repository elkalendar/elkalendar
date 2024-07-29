import React from 'react';
import {Head} from '@inertiajs/inertia-react';
import {Avatar, Box, Container, Group, Stack, Title,} from '@mantine/core';
import {BiCalendar} from 'react-icons/bi';
import EventListCard from '@/components/Events/EventListCard';
import {UserPublic} from '@/types/entities';
import NoResults from '@/components/NoResults/NoResults';

interface EventsProps {
  user: {
    data: UserPublic;
  };
  events: {
    data: any[];
  };
  displayEventsAs: string;
}

export default function Index(props: EventsProps) {
  return (
    <div>
      <Container
        pt={88}
        size="md"
      >
        {
          !props.user.data.settings.allowSeoIndexing ? (
            <Head>
              <title>{props.user.data.name}</title>
              <meta name="robots" content="noindex, nofollow"/>
              <meta name="googlebot" content="noindex"/>
              <meta name="googlebot-news" content="nosnippet"/>
            </Head>
          ) : <Head title={props.user.data.name}/>
        }

        <Stack align="center" w='100%'>
          <Avatar size="lg" src={props.user.data.avatar} alt={`${props.user.data.name}'s avatar`}/>

          <Title size="md">{props.user.data.name}</Title>

          <Group ta='center' justify='center' w='100%'>
            <Box w='100%'
                 dangerouslySetInnerHTML={{__html: props.user.data.profileMessage.replace(/(?:\r\n|\n|\r)/g, '<br/>')}}/>
          </Group>

          {
            props.events.data.length < 1 && (
              <NoResults
                icon={<BiCalendar/>}
                title="لا يوجد اجتماعات للحجز!"
                subtitle="اذا كنت مالك هذا الحساب، قم بتسجيل الدخول لمعرفة المزيد."
              />
            )
          }

          {
            props.events.data.map((event, index) => (
              <EventListCard
                key={index}
                event={event}
                username={props.user.data.username}
              />
            ))
          }
        </Stack>
      </Container>
    </div>
  );
}
