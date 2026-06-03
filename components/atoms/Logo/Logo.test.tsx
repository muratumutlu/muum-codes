import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import Logo from './Logo.component';

describe('Logo', () => {
  it('renders the product logo correctly', async () => {
    render(
      <MantineProvider>
        <Logo />
      </MantineProvider>,
    );

    expect(
      await screen.findByAltText('Muum Repo Explorer'),
    ).toBeInTheDocument();
  });
});
