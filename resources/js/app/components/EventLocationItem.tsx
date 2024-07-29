import React from 'react';
import {ActionIcon, Flex, Text, Tooltip, useMantineColorScheme, useMantineTheme,} from '@mantine/core';
import {FiEdit} from 'react-icons/fi';
import {Inertia} from '@inertiajs/inertia';
import {HiMiniXMark} from 'react-icons/hi2';
import {showErrorToast, showSuccessToast} from '@/utils/FormHelpers';
import {
  getEventLocationIcon,
  getEventLocationLabel,
  getEventLocationTypeDisplayValue,
} from '@/utils/EventLocationTypeHelpers';
import {Event} from '@/types/entities';
import EventLocationTypes from "@/enums/EventLocationTypes";
import {usePage} from "@inertiajs/inertia-react";

interface EventLocationItemProps {
  location: any;
  event: Event;
  onEdit: (locationType: EventLocationTypes) => void;
}

function EventLocationItem(props: EventLocationItemProps) {
  const page = usePage();
  const {location} = props;
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();

  return (
    <Flex
      gap={22}
      align="center"
      justify="space-between"
      p={12}
      mih={80}
      style={{
        border: '1px solid #e3e3e3',
        borderRadius: '8px',
        backgroundColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[2],
        borderColor: colorScheme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[4],
      }}
    >
      <Flex
        direction="column"
        gap={6}
      >
        <Flex
          align="center"
          gap={12}
        >
          {getEventLocationIcon(location.type)}
          {getEventLocationLabel(location.type)}
        </Flex>
        <Flex>
          <Text size="sm">
            {getEventLocationTypeDisplayValue(location)}
          </Text>
        </Flex>
      </Flex>

      <div className="actions">
        {
          location.type === EventLocationTypes.ZOOM ||
          location.type === EventLocationTypes.GOOGLE_MEET ||
          location.type === EventLocationTypes.IN_PERSON_GUEST ||
          location.type === EventLocationTypes.PHONE_OUTGOING ? null : <Tooltip label="تعديل">
            <ActionIcon
              variant="subtle"
              onClick={() => props.onEdit(location.type)}
            >
              <FiEdit/>
            </ActionIcon>
          </Tooltip>
        }

        <Tooltip label="حذف">
          <ActionIcon
            variant="subtle"
            onClick={() => {
              if (page.props.event.data.locations.length === 1) {
                showErrorToast('لا يمكن حذف المكان الوحيد');
                return;
              }

              Inertia.delete(`/events/${props.event.id}/locations/${location.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                  showSuccessToast('تم الحذف');
                },
              });
            }}
          >
            <HiMiniXMark/>
          </ActionIcon>
        </Tooltip>
      </div>
    </Flex>
  );
}

export default EventLocationItem;
