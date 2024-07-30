import React from 'react';
import { Flex, Text, Title } from '@mantine/core';

interface PageTitleProps {
  title?: string;
  subtitle?: string;
  leftSection?: React.JSX.Element;
  rightSection?: React.JSX.Element;
}

function PageHeader(props: PageTitleProps) {
  return (
    <Flex align="center" justify="space-between" mb={32}>
      <Flex gap={8} align="center">
        {props.rightSection}

        <div>
          <Title size="md">
            {props.title}
          </Title>
          <Text size="sm">{props.subtitle}</Text>
        </div>
      </Flex>

      {props.leftSection}
    </Flex>
  );
}

export default PageHeader;
