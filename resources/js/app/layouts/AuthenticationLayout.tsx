import React from 'react';
import {
  Box, Center, Flex, Image,
} from '@mantine/core';

export default function AuthenticationLayout(props: any) {
  return (
    <Center h="100vh" bg="var(--mantine-color-gray-light)">
      <Flex
        justify="center"
        align="center"
        direction="column"
        w="100%"
        maw={450}
      >
        <Box mb={22}>
          <Image h={60} src="/logo.svg" alt="elkalendar logo svg" />
        </Box>

        {props.children}
      </Flex>
    </Center>
  );
}
