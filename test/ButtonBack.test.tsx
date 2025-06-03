import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonBack } from '../src/components/ui/buttons/ButtonBack';
import { vi, describe, it, expect } from 'vitest';
import React from 'react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { beforeEach, afterEach } from 'node:test';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('ButtonBack Component', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
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
