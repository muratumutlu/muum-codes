import { TextInput, Tooltip } from '@mantine/core';
import { useState } from 'react';

import classes from './SearchInput.module.css';

interface SearchInputProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      label="Search for a repository"
      description="Type repository name or any topic and select language to filter results"
      placeholder="Term, topic, or repo name"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      className={classes.input}
      inputContainer={(children) => (
        <Tooltip
          label="You are free to write a repo name or any topic"
          position="top-start"
          opened={focused}
        >
          {children}
        </Tooltip>
      )}
    />
  );
}
