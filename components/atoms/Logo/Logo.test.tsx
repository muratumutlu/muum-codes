import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import Logo from './Logo.component';

describe('Logo', () => {
  it('renders the brand text correctly', () => {
    const brand = 'TestBrand';
    render(
      <MantineProvider>
        <Logo brand={brand} />
      </MantineProvider>
    );

    const brandText = screen.getByText(brand);
    expect(brandText).toBeInTheDocument();
    expect(brandText).toHaveStyle({ fontWeight: 900 });
  });
});
