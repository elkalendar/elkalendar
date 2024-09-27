import React from 'react';
import {
  Box, Button, Center, Flex, Image,
} from '@mantine/core';
import useTypedPage from "@/hooks/useTypedPage";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {useTranslation} from "react-i18next";

export default function AuthenticationLayout(props: any) {
  const {t} = useTranslation();
  const page = useTypedPage();

  return (
    <Center h="100vh" bg="var(--mantine-color-gray-light)" pos='relative'>

      <Button
        variant='subtle'
        pos='absolute'
        left={20}
        top={20}
        leftSection={page.props.isRtl ? <FaArrowRight/> : <FaArrowLeft/>}
        component='a'
        href={page.props.appUrl}
      >
        {t('btn.back')}
      </Button>

      <Flex
        justify="center"
        align="center"
        direction="column"
        w="100%"
        maw={450}
      >
        <Box mb={22}>
          <a href={page.props.appUrl}>
            <Image h={60} src="/logo.svg" alt="elkalendar logo svg"/>
          </a>
        </Box>

        {props.children}
      </Flex>
    </Center>
  );
}
