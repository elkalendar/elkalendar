import React from 'react';
import {InertiaLink} from '@inertiajs/inertia-react';
import {FaArrowRight} from 'react-icons/fa';
import {ActionIcon} from '@mantine/core';

interface BackButtonProps {
  href: string;
}

export default (props: BackButtonProps) => {
  return (
    <ActionIcon component={InertiaLink} href={props.href} variant="subtle">
      <FaArrowRight/>
    </ActionIcon>
  );
}
