import React from 'react';
import {TextInput} from '@mantine/core';

interface SlugInputProps {
  prefix: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: number;
  error?: string;
}

export default function (props: SlugInputProps) {
  return (
    <TextInput
      error={props.error}
      styles={{
        input: {
          direction: 'ltr',
          textAlign: 'left',
          paddingLeft: props.prefix.length + 2 + 'ch',
          marginTop: 'calc(var(--mantine-spacing-xs) / 2)',
        },
        section: {
          width: props.prefix.length + 'ch',
          direction: 'ltr',
          backgroundColor: '#4A5167',
          color: '#fff',
          fontSize: '15px',
          borderRadius: 0
        },
      }}
      leftSection={props.prefix}
      value={props.value}
      onChange={props.onChange}
    />
  );
}
