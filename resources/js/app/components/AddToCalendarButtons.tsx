import React from 'react';
import {
  ActionIcon, Center, Flex, Group, Tooltip,
} from '@mantine/core';
import { AiOutlineDownload, AiOutlineGoogle } from 'react-icons/ai';
import { SiMicrosoftoutlook } from 'react-icons/si';
import {GiPostOffice} from "react-icons/gi";

interface AddToCalendarButtonsProps {
  bookingId: string
  title?: string
  googleLink?: string
  outlookLink?: string
  officeLink?: string
}

function AddToCalendarButtons(props: AddToCalendarButtonsProps) {
  return (
    <Flex direction="column" mt={32} justify="center" gap={12}>
      {
        props.title && (
          <Center>{props.title}</Center>
        )
      }

      <Flex align="center" justify="center" gap={12}>
        <Tooltip label="أضف إلى تقويم جوجل">
          <ActionIcon size={38} variant="outline" component="a" target="_blank" href={props.googleLink} radius="xl">
            <AiOutlineGoogle size={16} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="أضف إلى تقويم Outlook">
          <ActionIcon size={38} variant="outline" component="a" target="_blank" href={props.outlookLink} radius="xl">
            <SiMicrosoftoutlook size={16} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="أضف إلى تقويم مايكروسوفت Office">
          <ActionIcon size={38} variant="outline" component="a" target="_blank" href={props.officeLink} radius="xl">
            <GiPostOffice size={16} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label="تحميل ملف التقويم ICS">
          <ActionIcon size={38} variant="outline" component="a" target="_blank" href={`/bookings/${props.bookingId}/download`} radius="xl">
            <AiOutlineDownload size={16} />
          </ActionIcon>
        </Tooltip>
      </Flex>
    </Flex>
  );
}

export default AddToCalendarButtons;
