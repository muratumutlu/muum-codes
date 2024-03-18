import { MantineProvider } from '@mantine/core';
import { fireEvent, render, screen } from '@testing-library/react';
import Filter from './Filter.component';

describe('Filter', () => {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  it('renders all options correctly', () => {
    render(
      <MantineProvider>
        <Filter value="option1" onChange={() => {}} options={options} />
      </MantineProvider>
    );

    options.forEach((option) => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });
  });

  it('selects the correct option', () => {
    const onChange = jest.fn();
    render(
      <MantineProvider>
        <Filter value="option2" onChange={onChange} options={options} />
      </MantineProvider>
    );

    const option2Radio = screen.getByLabelText('Option 2');
    expect(option2Radio).toBeChecked();

    const option1Radio = screen.getByLabelText('Option 1');
    fireEvent.click(option1Radio);
    expect(onChange).toHaveBeenCalledWith('option1');
  });
});
