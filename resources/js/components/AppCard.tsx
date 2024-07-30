import React from 'react';
import {
  Flex, Grid, Image, Text, Title,
  Button, useMantineColorScheme, useMantineTheme,
} from '@mantine/core';
import { InertiaLink } from '@inertiajs/inertia-react';

interface AppCardProps {
  app: any;
}

function AppCard(props: AppCardProps) {
  const { app } = props;
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();

  return (
    <Grid.Col
      gutter={{
        base: 5, xs: 'md', md: 'xl', xl: 50,
      }}
      span={{ base: 12, sm: 6, md: 4 }}
    >
      <Flex
        direction="column"
        gap={12}
        p={18}
        style={{
          border: '1px solid #e3e3e3',
          borderRadius: '8px',
          backgroundColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[2],
          borderColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[4],
        }}
      >
        <Image src={`/svg/${app.icon}`} alt={`${app.name} Logo`} maw={44} />

        <Title size="md">{app.name}</Title>

        <Text lineClamp={4} my={12}>
          {app.description}
        </Text>

        <Button
          component={InertiaLink}
          href={`/apps/details/${app.key}`}
          fullWidth
          variant="outline"
        >
          تفاصيل
        </Button>

      </Flex>
    </Grid.Col>
  );
}

export default AppCard;
