import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Popular from '../src/components/layout/popular/Popular';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';

vi.mock('../../../assets/images/fave1.png', () => 'test-fave1.png');
vi.mock('../../../assets/images/fave2.png', () => 'test-fave2.png');
vi.mock('../../../assets/images/fave3.png', () => 'test-fave3.png');

describe('Popular Component', () => {
  it('renders all product cards with correct content', () => {
    render(
      <MemoryRouter>
        <Popular />
      </MemoryRouter>
    );

    expect(screen.getByText('Dyson Purifier Big')).toBeInTheDocument();
    expect(screen.getByText('Dyson OnTrac™')).toBeInTheDocument();
    expect(screen.getByText('Dyson Airstrait')).toBeInTheDocument();
  });

  it('renders all product images with correct alt text', () => {
    render(
      <MemoryRouter>
        <Popular />
      </MemoryRouter>
    );

    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('alt', 'Dyson Purifier Big');
    expect(images[1]).toHaveAttribute('alt', 'Dyson OnTrac');
    expect(images[2]).toHaveAttribute('alt', 'Dyson Airstrait');
  });

  it('renders all shop now buttons with proper accessibility', () => {
    render(
      <MemoryRouter>
        <Popular />
      </MemoryRouter>
    );

    const buttons = [
      screen.getByRole('link', { name: 'Buy Dyson Purifier' }),
      screen.getByRole('link', { name: 'Buy Dyson OnTrac' }),
      screen.getByRole('link', { name: 'Buy Dyson Airstrait' }),
    ];

    buttons.forEach((button) => {
      expect(button).toHaveTextContent('Shop now');
    });
  });
});
