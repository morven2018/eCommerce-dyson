import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CartInfo from '../src/components/layout/cart/CartInfo.module';
import { CartData, CartLineItem } from '../src/shared/types/types';

vi.mock('@shared/context/cart/useCart', () => ({
  useCart: vi.fn(() => ({
    setCart: vi.fn(),
    cart: undefined,
    cartItemsCount: 0,
    isCartEmpty: false,
    clearCart: vi.fn(),
    updateCart: vi.fn(),
    error: null,
  })),
}));

vi.mock('@components/ui/cards/CartProductCard', () => ({
  default: vi.fn(({ data }: { data: CartLineItem }) => (
    <div data-testid="product-card">
      <span>{data.name['en-US']}</span>
    </div>
  )),
}));

describe('CartInfo Component - Basic Rendering', () => {
  const mockData: CartData = {
    id: 'cart-123',
    version: 1,
    lineItems: [
      {
        id: 'item-1',
        productId: 'prod-1',
        name: { 'en-US': 'Test Product' },
        quantity: 2,
        price: {
          value: {
            centAmount: 1000,
            currencyCode: 'USD',
            fractionDigits: 2,
            type: 'centPrecision',
          },
          discounted: {
            value: {
              centAmount: 900,
              currencyCode: 'USD',
              fractionDigits: 2,
              type: 'centPrecision',
            },
          },
        },
        variant: {
          images: [
            {
              url: 'test-image.jpg',
              label: 'Test Image',
            },
          ],
          id: 1,
          key: 'variant-1',
        },
        productKey: 'product-1',
        totalPrice: {
          centAmount: 2000,
          currencyCode: 'USD',
          fractionDigits: 2,
          type: 'centPrecision',
        },
      },
    ],
    totalPrice: {
      centAmount: 2000,
      currencyCode: 'USD',
      type: 'centPrecision',
      fractionDigits: 2,
    },
    cartState: 'Active',
  };

  const mockSetData = vi.fn();
  const mockSetDiscountPercentage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders cart summary correctly', () => {
    render(
      <MemoryRouter>
        <CartInfo
          data={mockData}
          setData={mockSetData}
          discountPercentage={10}
          setDiscountPercentage={mockSetDiscountPercentage}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Total:/)).toBeInTheDocument();
    expect(screen.getByText('2 items')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Clear Cart/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });
});
