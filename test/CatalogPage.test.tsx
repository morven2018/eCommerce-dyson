import { render, screen, fireEvent, act } from '@testing-library/react';
import { CatalogPage } from '../src/pages/catalog/CatalogPage';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@shared/api/local-storage/getTokenFromLS', () => ({
  getTokenFromLS: vi.fn(() => 'mock-token'),
}));

vi.mock('@shared/api/commerce-tools/getSearchedProducts', () => ({
  getSearchedProducts: vi.fn(() =>
    Promise.resolve({
      results: [
        {
          id: '1',
          name: { 'en-US': 'Product 1' },
          description: { 'en-US': 'Description 1' },
          masterVariant: {
            prices: [{ value: { centAmount: 10000 }, discounted: null }],
            images: [{ url: 'image1.jpg' }],
            attributes: [{ value: 'Red' }],
          },
        },
        {
          id: '2',
          name: { 'en-US': 'Product 2' },
          description: { 'en-US': 'Description 2' },
          masterVariant: {
            prices: [
              {
                value: { centAmount: 20000 },
                discounted: { value: { centAmount: 15000 } },
              },
            ],
            images: [{ url: 'image2.jpg' }],
            attributes: [{ value: 'Blue' }],
          },
        },
      ],
    })
  ),
}));

vi.mock('@services/DialogService', () => ({
  openDialog: vi.fn(),
}));

vi.mock('@components/ui/breadcrumbs/breadcrumbs', () => ({
  Breadcrumbs: () =>
    React.createElement('div', { 'data-testid': 'breadcrumbs' }, 'Breadcrumbs'),
}));

describe('CatalogPage Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(
      <MemoryRouter>
        <CatalogPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders content with product data after loading', async () => {
    render(
      <MemoryRouter>
        <CatalogPage />
      </MemoryRouter>
    );
    await act(async () => {
      vi.advanceTimersByTime(500);
    });
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
  });

  it('updates search text', async () => {
    render(
      <MemoryRouter>
        <CatalogPage />
      </MemoryRouter>
    );
    await act(async () => {
      vi.advanceTimersByTime(500);
    });
    const searchInput = screen.getByLabelText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });
    await act(async () => {
      vi.advanceTimersByTime(500);
    });
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });
});
