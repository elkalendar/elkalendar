import React, {useState} from 'react';
import {Flex, Modal, Select} from '@mantine/core';
import {Event} from '@/types/entities';
import EventLocationTypes from '@/enums/EventLocationTypes';
import {getEventLocationLabel} from '@/utils/EventLocationTypeHelpers';
import CustomTextForm from '@/components/EventLocationForms/CustomTextForm';
import LinkForm from '@/components/EventLocationForms/LinkForm';
import InPersonHostForm from '@/components/EventLocationForms/InPersonHostForm';
import EventLocationsList from '@/components/EventLocationsList';
import InPersonGuestForm from '@/components/EventLocationForms/InPersonGuestForm';
import {useTranslation} from "react-i18next";
import useSuccessToast from "@/hooks/useSuccessToast";

interface EventLocationsProps {
  event: Event;
}

function EventLocations(props: EventLocationsProps) {
  const successToast = useSuccessToast();
  const {t} = useTranslation();
  const [selectedLocationType, setSelectedLocationType] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const locations = props.event.locations || [];

  const onSuccess = () => {
    setModalOpen(false);
    setSelectedLocationType(null);
    successToast();
  };

  const getLocationForm = (locationType: string, event: Event, location?: any) => {
    switch (locationType) {
      case EventLocationTypes.TEXT:
        return <CustomTextForm
          event={event}
          onSuccess={onSuccess}
          location={location}
        />;
      case EventLocationTypes.CUSTOM_LINK:
        return <LinkForm
          event={event}
          onSuccess={onSuccess}
          location={location}
        />;
      case EventLocationTypes.IN_PERSON_HOST:
        return <InPersonHostForm
          event={event}
          onSuccess={onSuccess}
          location={location}
        />;
      case EventLocationTypes.IN_PERSON_GUEST:
        return <InPersonGuestForm event={event} onSuccess={onSuccess}/>;
      default:
        throw new Error('Invalid location type');
    }
  };

  const getLocation = (locationType: string) => {
    return locations.find((location) => location.type === locationType);
  }

  return (

    <Flex direction="column" gap={22}>
      <Modal
        centered
        size='lg'
        title={getEventLocationLabel(selectedLocationType)}
        opened={modalOpen}
        onClose={() => {
          setSelectedLocationType(null);
          setModalOpen(false);
          setSelectedLocationType(null);
        }}
      >
        {selectedLocationType && getLocationForm(selectedLocationType, props.event, getLocation(selectedLocationType))}
      </Modal>

      <EventLocationsList
        locations={props.event.locations}
        event={props.event}
        onEdit={(locationType) => {
          setSelectedLocationType(locationType);
          setModalOpen(true);
        }}
      />

      <Select
        label={t('forms.event.locations.label')}
        description={t('forms.event.locations.description')}
        placeholder={t('forms.event.locations.placeholder')}
        value={selectedLocationType}
        onChange={(event) => {
          setSelectedLocationType(event);
          setModalOpen(true);
        }}
        data={[
          {
            group: t('forms.event.locations.group_in_person'),
            items: [
              {
                value: EventLocationTypes.IN_PERSON_HOST,
                label: getEventLocationLabel(EventLocationTypes.IN_PERSON_HOST),
                disabled: locations.find((location) => location.type === EventLocationTypes.IN_PERSON_HOST),
              }, {
                value: EventLocationTypes.IN_PERSON_GUEST,
                label: getEventLocationLabel(EventLocationTypes.IN_PERSON_GUEST),
                disabled: locations.find((location) => location.type === EventLocationTypes.IN_PERSON_GUEST),
              },
            ],
          },
          {
            group: t('forms.event.locations.group_other'),
            items: [
              {
                value: EventLocationTypes.TEXT,
                label: getEventLocationLabel(EventLocationTypes.TEXT),
                disabled: locations.find((location) => location.type === EventLocationTypes.TEXT),
              }, {
                value: EventLocationTypes.CUSTOM_LINK,
                label: getEventLocationLabel(EventLocationTypes.CUSTOM_LINK),
                disabled: locations.find((location) => location.type === EventLocationTypes.CUSTOM_LINK),
              },
            ],
          },
        ]}
      />
    </Flex>
  );
}

export default EventLocations;
