import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import Footer from '../src/components/layout/footer/Footer';

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
};

describe('Footer Component', () => {
  it('renders © RS School 2025', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const copyrightElement = screen.getByText('© RS School 2025');
    expect(copyrightElement).toBeInTheDocument();
  });

  it('renders all links with correct href attributes', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const vacuumsLink = screen.getByRole('link', {
      name: /Vacuums & floor cleaners/i,
    });
    expect(vacuumsLink).toBeInTheDocument();
    expect(vacuumsLink).toHaveAttribute('href', '/catalog/vacuums');

    const alenaLink = screen.getByRole('link', { name: /Alena Pudina/i });
    expect(alenaLink).toBeInTheDocument();
    expect(alenaLink).toHaveAttribute('href', 'https://github.com/morven2018');

    const yuliaLink = screen.getByRole('link', { name: /Yulia Podgurskaia/i });
    expect(yuliaLink).toBeInTheDocument();
    expect(yuliaLink).toHaveAttribute('href', 'https://github.com/yuliafire');

    const igorLink = screen.getByRole('link', { name: /Igor Batura/i });
    expect(igorLink).toBeInTheDocument();
    expect(igorLink).toHaveAttribute('href', 'https://github.com/Ihar-Batura');
  });

  it('navigates to /catalog/vacuums when Vacuums link is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Footer />
        <LocationDisplay />
      </MemoryRouter>
    );

    const vacuumsLink = screen.getByRole('link', {
      name: /Vacuums & floor cleaners/i,
    });
    await user.click(vacuumsLink);

    const location = screen.getByTestId('location');
    expect(location).toHaveTextContent('/catalog/vacuums');
  });
});