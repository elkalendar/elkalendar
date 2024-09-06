import React from 'react';
import {
  ActionIcon, Center, Flex, Tooltip,
} from '@mantine/core';
import {AiOutlineDownload, AiOutlineGoogle} from 'react-icons/ai';
import {SiMicrosoftoutlook} from 'react-icons/si';
import {GiPostOffice} from "react-icons/gi";
import {useTranslation} from "react-i18next";

interface AddToCalendarButtonsProps {
  bookingId: string
  title?: string
  googleLink?: string
  outlookLink?: string
  officeLink?: string
}

function AddToCalendarButtons(props: AddToCalendarButtonsProps) {
  const {t} = useTranslation();

  return (
    <Flex direction="column" mt={32} justify="center" gap={12}>
      {
        props.title && (
          <Center>{props.title}</Center>
        )
      }

      <Flex align="center" justify="center" gap={12}>
        <Tooltip label={t('btn.add_to_google')}>
          <ActionIcon size={38} variant="outline" component="a" target="_blank" href={props.googleLink} radius="xl">
            <AiOutlineGoogle size={16}/>
          </ActionIcon>
        </Tooltip>

        <Tooltip label={t('btn.add_to_outlook')}>
          <ActionIcon size={38} variant="outline" component="a" target="_blank" href={props.outlookLink} radius="xl">
            <SiMicrosoftoutlook size={16}/>
          </ActionIcon>
        </Tooltip>

        <Tooltip label={t('btn.add_to_office')}>
          <ActionIcon size={38} variant="outline" component="a" target="_blank" href={props.officeLink} radius="xl">
            <GiPostOffice size={16}/>
          </ActionIcon>
        </Tooltip>

        <Tooltip label={t('btn.download_ics')}>
          <ActionIcon size={38} variant="outline" component="a" target="_blank"
                      href={`/bookings/${props.bookingId}/download`} radius="xl">
            <AiOutlineDownload size={16}/>
          </ActionIcon>
        </Tooltip>
      </Flex>
    </Flex>
  );
}

export default AddToCalendarButtons;
