import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { Header } from '../src/components/layout/header/Header';

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
};

describe('Header Component', () => {
  it('renders logo link with correct href', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoLink = screen.getByRole('link', { name: /To home page dyson/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders all navigation buttons with correct paths', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const catalogButton = screen.getByRole('button', { name: /Catalog/i });
    expect(catalogButton).toBeInTheDocument();

    const aboutButton = screen.getByRole('button', { name: /About/i });
    expect(aboutButton).toBeInTheDocument();

    const registerButton = screen.getByRole('button', { name: /Register/i });
    expect(registerButton).toBeInTheDocument();

    const loginButton = screen.getByRole('button', { name: /LOG IN/i });
    expect(loginButton).toBeInTheDocument();

    const cartButton = screen.getByRole('button', { name: /Cart/i });
    expect(cartButton).toBeInTheDocument();
  });

  it('navigates to /catalog when Catalog button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
        <LocationDisplay />
      </MemoryRouter>
    );

    const catalogButton = screen.getByRole('button', { name: /Catalog/i });
    await user.click(catalogButton);
    const location = screen.getByTestId('location');
    expect(location).toHaveTextContent('/catalog');
  });

  it('renders empty cart icon when cart is empty', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });

  it('toggles Menu when burger button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    const burgerButton = screen.getByRole('button', { name: /menu/i });
    await user.click(burgerButton);

    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
  });
});
