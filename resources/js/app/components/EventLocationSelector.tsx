import {Flex, Input, Radio, RadioGroup, Stack, Text,} from '@mantine/core';
import React, {useEffect, useState} from 'react';
import {EventLocation} from '@/types/entities';
import {
  getEventLocationDescription,
  getEventLocationIcon,
  getEventLocationLabelPublic,
} from '@/utils/EventLocationTypeHelpers';
import EventLocationTypes from '@/enums/EventLocationTypes';

interface EventLocationSelectorProps {
  locations: EventLocation[]
  setSelectedLocation: (location: string) => void
  setEventLocationData: (data: any) => void
  errors?: any
}

export default function (props: EventLocationSelectorProps) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (props.locations.length === 1) {
      setSelectedLocation(props.locations[0].type);
      props.setSelectedLocation(props.locations[0].type);
    }
  }, []);


  return (
    <RadioGroup
      withAsterisk
      value={selectedLocation}
      label="طريقة حضور الموعد"
      description="اختر طريقة حضور الموعد من الطرق المتاحة"
      onChange={(event) => {
        setSelectedLocation(event);
        props.setSelectedLocation(event);
      }}
      error={props.errors?.location}
    >
      <Stack mt={12} gap={14}>
        {
          props.locations.map((location: EventLocation, index: number) => (
            <Radio
              key={index}
              value={location.type}
              label={(
                <Flex
                  direction="column"
                  gap={2}
                >
                  <Flex gap={8}>
                    {getEventLocationIcon(location.type)}
                    <Text>{getEventLocationLabelPublic(location.type, location.data)}</Text>
                  </Flex>

                  {
                    selectedLocation === location.type &&
                    <Text size="xs">{getEventLocationDescription(location.type, location.data)}</Text>
                  }
                </Flex>
              )}
            />
          ))
        }

        {
          selectedLocation === EventLocationTypes.IN_PERSON_GUEST && (
            <Input.Wrapper
              withAsterisk
              label="عنوان الموعد"
              description="قم بإدخال عنوان او مكان الموعد الذي ترغب فيه"
              error={props.errors['locationData.address']}
            >
              <Input
                onChange={(e) => props.setEventLocationData({address: e.currentTarget.value})}
                error={props.errors['locationData.address']}
              />
            </Input.Wrapper>
          )
        }
      </Stack>
    </RadioGroup>
  );
}
