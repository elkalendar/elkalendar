import React, {useState} from 'react';
import {ComboboxData, Flex, Modal, Select} from '@mantine/core';
import {AllowedLocationType, Event} from '@/types/entities';
import EventLocationTypes from '@/enums/EventLocationTypes';
import CustomTextForm from '@/components/EventLocationForms/CustomTextForm';
import LinkForm from '@/components/EventLocationForms/LinkForm';
import InPersonHostForm from '@/components/EventLocationForms/InPersonHostForm';
import EventLocationsList from '@/components/EventLocationsList';
import InPersonGuestForm from '@/components/EventLocationForms/InPersonGuestForm';
import {useTranslation} from "react-i18next";
import useSuccessToast from "@/hooks/useSuccessToast";

interface EventLocationsProps {
  event: Event;
  allowedLocationTypes: AllowedLocationType[];
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
        console.error('Invalid location type');
    }
  };

  const getLocation = (locationType: string) => {
    return locations.find((location) => location.type === locationType);
  }

  const locationsHasLocationType = (locationType: string): boolean => {
    return locations.find((location) => location.type === locationType) !== undefined;
  }

  const enabledLocations = (): ComboboxData => {
    return props.allowedLocationTypes.map(locationType => {
      return {
        value: locationType.key,
        label: locationType.title,
        disabled: locationsHasLocationType(locationType.key),
      }
    });
  }

  return (
    <Flex direction="column" gap={22}>
      <Modal
        centered
        size='lg'
        title={t('location_types_user.title.' + selectedLocationType)}
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
        data={enabledLocations()}
      />
    </Flex>
  );
}

export default EventLocations;
