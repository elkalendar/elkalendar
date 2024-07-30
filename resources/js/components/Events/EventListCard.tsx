import { Link } from '@inertiajs/inertia-react';
import React from 'react';
import { FaClock } from 'react-icons/fa';
import {
  Badge, Container, Flex, Text, useMantineColorScheme, useMantineTheme,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';

export default function EventListCard(props: any) {
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();

  const getBackgroundColor = () => {
    if (hovered) {
      return colorScheme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[0];
    }
    return colorScheme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[2];
  };

  return (
    <Container
      component={Link}
      w='100%'
      href={`/${props.username}/${props.event.slug}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Flex
        w='100%'
        ref={ref}
        p={18}
        style={{
          border: '1px solid #e3e3e3',
          borderRadius: '8px',
          backgroundColor: getBackgroundColor(),
          borderColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[4],
          borderRightWidth: '4px',
          borderRightColor: props.event.color,
        }}
        direction="column"
        gap={8}
      >
        <Text size="lg">{props.event.name}</Text>
        <Text size="sm">{props.event.description}</Text>

        <Badge leftSection={<FaClock />} mt={12}>
          {props.event.duration}
          {' '}
          دقيقة
        </Badge>
      </Flex>
    </Container>
  );
}
