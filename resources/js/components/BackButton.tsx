import React from 'react';
import {InertiaLink} from '@inertiajs/inertia-react';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import {ActionIcon} from '@mantine/core';
import useTypedPage from "@/hooks/useTypedPage";

interface BackButtonProps {
  href: string;
}

export default (props: BackButtonProps) => {
  const page = useTypedPage();

  return (
    <ActionIcon component={InertiaLink} href={props.href} variant="subtle">
      {page.props.isRtl ? <FaArrowRight/> : <FaArrowLeft/>}
    </ActionIcon>
  );
}
