import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { CatalogPage } from '../src/pages/catalog/CatalogPage';
import * as commerceToolsApi from '../src/shared/api/commerce-tools/getSearchedProducts';
import * as cartApi from '../src/shared/api/commerce-tools/apiGetCartById';
import React from 'react';

vi.mock('@shared/api/commerce-tools/getSearchedProducts');
vi.mock('@shared/api/commerce-tools/apiGetCartById');
vi.mock('@shared/api/local-storage/getTokenFromLS');
vi.mock('@shared/api/local-storage/getCartIdFromLS');
vi.mock('@components/ui/error/catchError');

const mockProductsData = {
  results: [
    {
      id: '1',
      name: { 'en-US': 'Test Product' },
      description: { 'en-US': 'Test Description' },
      masterVariant: {
        prices: [{ value: { centAmount: 1000 } }],
        images: [{ url: 'test-image.jpg' }],
      },
    },
  ],
  total: 1,
  facets: {
    'variants.attributes.color': {
      terms: [{ term: 'red' }, { term: 'blue' }],
    },
    'variants.price.centAmount': {
      ranges: [{ min: 0, max: 2000 }],
    },
  },
};

const mockCartItems = [
  {
    productId: '1',
    name: { 'en-US': 'Test Product' },
    variant: {
      images: [{ url: 'test-image.jpg' }],
    },
  },
];

describe('CatalogPage Component', { timeout: 10000 }, () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(commerceToolsApi.getSearchedProducts).mockResolvedValue(
      mockProductsData
    );
    vi.mocked(cartApi.apiGetCartById).mockResolvedValue({
      lineItems: mockCartItems,
    });
  });

  test('renders loading state initially', () => {
    vi.mocked(commerceToolsApi.getSearchedProducts).mockImplementation(
      () => new Promise(() => {})
    );

    render(<CatalogPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('handles API errors gracefully', async () => {
    vi.mocked(commerceToolsApi.getSearchedProducts).mockRejectedValue(
      new Error('API Error')
    );
    render(<CatalogPage />);
  });
});
