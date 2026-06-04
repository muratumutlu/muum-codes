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
      label="Repository search"
      description="Search GitHub by repo name, topic, framework, or capability"
      placeholder="e.g. mcp server, eval framework, browser automation"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      className={classes.input}
      inputContainer={(children) => (
        <Tooltip
          label="This is GitHub keyword search; short queries work best"
          position="top-start"
          opened={focused}
        >
          {children}
        </Tooltip>
      )}
    />
  );
}
