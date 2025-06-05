import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonBack } from '../src/components/ui/buttons/ButtonBack';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('ButtonBack Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the back button with correct text', () => {
    render(
      <MemoryRouter>
        <ButtonBack />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /back/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Back');
  });

  it('navigates back when the button is clicked', () => {
    render(
      <MemoryRouter>
        <ButtonBack />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /back/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
