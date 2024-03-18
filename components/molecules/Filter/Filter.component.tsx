import { Group, Radio } from '@mantine/core';

interface FilterProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}

export default function Filter({ value, onChange, options }: FilterProps) {
  return (
    <Group>
      {options.map((option) => (
        <Radio
          key={option.value}
          checked={value === option.value}
          onChange={() => onChange(option.value)}
          label={option.label}
          value={option.value}
        />
      ))}
    </Group>
  );
}
