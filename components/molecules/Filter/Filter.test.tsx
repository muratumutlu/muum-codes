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
        <Filter value={['option1']} onChange={() => {}} options={options} />
      </MantineProvider>,
    );

    fireEvent.click(screen.getByLabelText('Language filters'));

    options.forEach((option) => {
      expect(screen.getAllByText(option.label).length).toBeGreaterThan(0);
    });
  });

  it('selects multiple options', () => {
    const onChange = jest.fn();
    render(
      <MantineProvider>
        <Filter value={['option2']} onChange={onChange} options={options} />
      </MantineProvider>,
    );

    expect(screen.getAllByText('Option 2').length).toBeGreaterThan(0);

    fireEvent.click(screen.getByLabelText('Language filters'));
    fireEvent.click(screen.getByRole('option', { name: 'Option 1' }));
    expect(onChange).toHaveBeenCalledWith(['option2', 'option1']);
  });
});
