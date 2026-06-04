import { MultiSelect } from '@mantine/core';
import classes from './Filter.module.css';

interface FilterProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: { label: string; value: string }[];
}

export default function Filter({ value, onChange, options }: FilterProps) {
  return (
    <MultiSelect
      aria-label="Language filters"
      classNames={{
        input: classes.input,
        option: classes.option,
        pill: classes.pill,
        dropdown: classes.dropdown,
      }}
      clearable
      data={options}
      maxDropdownHeight={280}
      nothingFoundMessage="No language found"
      onChange={onChange}
      placeholder="Any language"
      searchable
      value={value}
    />
  );
}
