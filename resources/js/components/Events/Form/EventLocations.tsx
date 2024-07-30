import React, {useState} from 'react';
import {Flex, Modal, Select} from '@mantine/core';
import {Event} from '@/types/entities';
import EventLocationTypes from '@/enums/EventLocationTypes';
import {getEventLocationLabel} from '@/utils/EventLocationTypeHelpers';
import CustomTextForm from '@/components/EventLocationForms/CustomTextForm';
import LinkForm from '@/components/EventLocationForms/LinkForm';
import InPersonHostForm from '@/components/EventLocationForms/InPersonHostForm';
import {showSuccessToast} from '@/utils/FormHelpers';
import EventLocationsList from '@/components/EventLocationsList';
import InPersonGuestForm from '@/components/EventLocationForms/InPersonGuestForm';
import GoogleMeetForm from '@/components/EventLocationForms/GoogleMeetForm';
import ZoomForm from "@/components/EventLocationForms/ZoomForm";

interface EventLocationsProps {
  event: Event;
}

function EventLocations(props: EventLocationsProps) {
  const [selectedLocationType, setSelectedLocationType] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const locations = props.event.locations || [];

  const onSuccess = () => {
    setModalOpen(false);
    setSelectedLocationType(null);
    showSuccessToast('تم حفظ التعديلات');
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
      case EventLocationTypes.GOOGLE_MEET:
        return <GoogleMeetForm event={event} onSuccess={onSuccess}/>;
      case EventLocationTypes.ZOOM:
        return <ZoomForm event={event} onSuccess={onSuccess}/>;
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
        placeholder="اختر طريقة"
        label="طرق عقد الاجتماع"
        description="اضف واحدة او اكثر من طرق عقد الاجتماع سواء مقابلة حية او اونلاين"
        value={selectedLocationType}
        onChange={(event) => {
          setSelectedLocationType(event);
          setModalOpen(true);
        }}
        data={[
          {
            group: 'المكالمات والكونفرانس',
            items: [
              {
                value: EventLocationTypes.GOOGLE_MEET,
                label: getEventLocationLabel(EventLocationTypes.GOOGLE_MEET),
                disabled: locations.find((location) => location.type === EventLocationTypes.GOOGLE_MEET),
              },
              {
                value: EventLocationTypes.ZOOM,
                label: getEventLocationLabel(EventLocationTypes.ZOOM),
                disabled: locations.find((location) => location.type === EventLocationTypes.ZOOM),
              },
              // {
              //   value: EventLocationTypes.MICROSOFT_TEAMS,
              //   label: getEventLocationLabel(EventLocationTypes.MICROSOFT_TEAMS),
              //   disabled: locations.find((location) => location.type === EventLocationTypes.MICROSOFT_TEAMS),
              // },
            ],
          },
          {
            group: 'مقابلة شخصية',
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
            group: 'اخرى',
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
