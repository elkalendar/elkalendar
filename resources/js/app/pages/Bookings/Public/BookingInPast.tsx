import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import {
  Center, Container, Flex, Image, useMantineColorScheme,
} from '@mantine/core';
import Thinking from '@/assets/svg/Thinking.svg';

export default function () {
  const colorScheme = useMantineColorScheme();
  return (
    <Container>
      <Center>
        <Head title="تم تأكيد الحجز" />
        <Flex
          wrap
          mt={66}
          bg={colorScheme.colorScheme === 'dark' ? 'gray.7' : 'gray.4'}
          direction="column"
          justify="center"
          align="center"
          maw={600}
          w="100%"
          gap={22}
          style={{ borderRadius: 8 }}
        >
          <h3 className="text-2xl mb-4">هذا الحجز في الماضي</h3>
          <Image maw={300} alt="thinking concept svg" className="w-1/2" src={Thinking} />
        </Flex>
      </Center>
    </Container>
  );
}
