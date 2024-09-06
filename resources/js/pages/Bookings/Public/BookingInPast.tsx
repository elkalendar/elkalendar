import React from 'react';
import {Head} from '@inertiajs/inertia-react';
import {
  Center, Container, Flex, Image, useMantineColorScheme,
} from '@mantine/core';
import Thinking from '@/assets/svg/Thinking.svg';
import {useTranslation} from "react-i18next";

export default function () {
  const {t} = useTranslation();
  const colorScheme = useMantineColorScheme();

  return (
    <Container>
      <Center>
        <Head title={t('bookings.past_title')}/>
        <Flex
          mt={66}
          bg={colorScheme.colorScheme === 'dark' ? 'gray.7' : 'gray.4'}
          direction="column"
          justify="center"
          align="center"
          maw={600}
          w="100%"
          gap={22}
          style={{borderRadius: 8}}
        >
          <h3 className="text-2xl mb-4">
            {t('bookings.past_desc')}
          </h3>
          <Image maw={300} alt="thinking concept svg" className="w-1/2" src={Thinking}/>
        </Flex>
      </Center>
    </Container>
  );
}
