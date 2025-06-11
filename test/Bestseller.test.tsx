import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Bestseller from '../src/components/layout/bestseller/Bestseller';

describe('Bestseller Component', () => {
  it('renders the component with all content', () => {
    render(
      <MemoryRouter>
        <Bestseller />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Bestseller/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Dyson V8 Absolute vacuum/i)).toBeInTheDocument();

    const paragraph = screen.getByText(
      /The Dyson V8 Absolute effortlessly tackles pet hair/i
    );
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent(
      'up to 40 minutes of fade-free suction'
    );

    const shopNowButton = screen.getByRole('button', { name: /Shop Now/i });
    expect(shopNowButton).toBeInTheDocument();
    expect(shopNowButton).toHaveAttribute(
      'aria-label',
      'Shop now for Dyson V8 Absolute vacuum'
    );
  });

  it('has a working link to home page', () => {
    render(
      <MemoryRouter>
        <Bestseller />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toContainElement(screen.getByText(/Shop Now/i));
  });
});
