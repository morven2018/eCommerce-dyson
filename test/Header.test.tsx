import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { Header } from '../src/components/layout/header/Header';
import { AuthContext } from '../src/shared/context/auth-context';

const MockAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUserUnauthorized, setIsUserUnauthorized] = React.useState(true);

  return (
    <AuthContext.Provider value={{ isUserUnauthorized, setIsUserUnauthorized }}>
      {children}
    </AuthContext.Provider>
  );
};

vi.mock('../../../shared/context/auth-hooks', async () => {
  const actual = await vi.importActual('../src/shared/context/auth-hooks');
  return {
    ...actual,
    useAuth: () => React.useContext(AuthContext),
  };
});

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
};

describe('Header Component', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders logo link with correct href', () => {
    render(
      <MockAuthProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </MockAuthProvider>
    );

    const logoLink = screen.getByRole('link', { name: /To home page dyson/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders all navigation buttons with correct paths', () => {
    render(
      <MockAuthProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </MockAuthProvider>
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
      <MockAuthProvider>
        <MemoryRouter initialEntries={['/']}>
          <Header />
          <LocationDisplay />
        </MemoryRouter>
      </MockAuthProvider>
    );

    const catalogButton = screen.getByRole('button', { name: /Catalog/i });
    await user.click(catalogButton);
    const location = screen.getByTestId('location');
    expect(location).toHaveTextContent('/catalog');
  });

  it('renders empty cart icon when cart is empty', () => {
    render(
      <MockAuthProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </MockAuthProvider>
    );

    const cartButton = screen.getByRole('button', { name: /Cart/i });
    expect(cartButton).toBeInTheDocument();

    const cartIcon = screen.getByRole('img', { name: /Cart/i });
    expect(cartIcon).toBeInTheDocument();
    expect(cartIcon).toHaveAttribute('alt', 'Cart');
  });

  it('toggles Menu when burger button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MockAuthProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </MockAuthProvider>
    );

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    const burgerButton = screen.getByRole('button', { name: 'menu' });
    await user.click(burgerButton);

    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
  });
});
