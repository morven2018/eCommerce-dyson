import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HomePage } from '../src/pages/home/Home';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/' }),
    useParams: () => ({}),
  };
});

describe('HomePage Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  });

  it('renders without crashing', () => {
    expect(screen.getByText('Bestseller')).toBeInTheDocument();
  });

  it('renders the Bestseller component', () => {
    expect(screen.getByText('Dyson V8 Absolute vacuum')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Shop now for Dyson V8 Absolute vacuum/i })).toBeInTheDocument();
  });

  it('renders the Popular component', () => {
    expect(screen.getByText('Dyson Purifier Big')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Buy Dyson Purifier/i })).toBeInTheDocument();
  });

  it('renders the Strengths component', () => {
    expect(screen.getByText('WHY choose us?')).toBeInTheDocument();
    expect(screen.getByText('Innovative Technology')).toBeInTheDocument();
  });

  it('renders the Media component', () => {
    expect(screen.getByText('Follow us on social media')).toBeInTheDocument();
  });
})