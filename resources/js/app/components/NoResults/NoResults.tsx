import React from 'react';
import {Flex, Group, Text, Title, useMantineColorScheme, useMantineTheme,} from '@mantine/core';

interface NoResultsProps {
  title?: string;
  subtitle?: string;
  action?: React.JSX.Element;
  icon?: React.JSX.Element;
}

export default function (props: NoResultsProps) {
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();

  return (
    <Flex
      gap={22}
      direction="column"
      align="center"
      justify="center"
      p={22}
      style={{
        height: '300px',
        border: '1px solid #e3e3e3',
        borderRadius: '8px',
        backgroundColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[2],
        borderColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[4],
      }}
    >

      <Group>
        {props.icon}
      </Group>

      <Title size="lg">{props.title}</Title>

      <Text>
        {props.subtitle}
      </Text>

      {props.action}
    </Flex>
  );
}
