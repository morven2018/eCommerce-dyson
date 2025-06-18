import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartProductCard from '../src/components/ui/cards/CartProductCard';
import { CartLineItem, TotalPrice } from '../src/shared/types/types';

vi.mock('../../layout/cart/Cart.module.scss', () => ({
  default: {
    productCard: 'productCard',
    productInfo: 'productInfo',
    productImage: 'productImage',
    productNameArea: 'productNameArea',
    counterWrapper: 'counterWrapper',
    pricesDiscount: 'pricesDiscount',
    price: 'price',
    oldPrice: 'oldPrice',
    deleteWrapper: 'deleteWrapper',
  },
}));

vi.mock('@shared/utlis/price-formatter', () => ({
  default: (price: TotalPrice) => `$${(price.centAmount / 100).toFixed(2)}`,
}));

describe('CartProductCard', () => {
  const mockData: CartLineItem = {
    id: 'item-1',
    name: { 'en-US': 'Test Product' },
    variant: {
      key: 'variant-1',
      images: [{ url: 'test.jpg', label: 'Test Image' }],
      id: 0,
    },
    price: {
      value: {
        centAmount: 1000,
        currencyCode: 'USD',
        fractionDigits: 0,
        type: '',
      },
      discounted: {
        value: {
          centAmount: 800,
          currencyCode: 'USD',
          fractionDigits: 0,
          type: '',
        },
      },
    },
    quantity: 2,
    productId: '',
    productKey: '',
    totalPrice: {
      centAmount: 0,
      currencyCode: '',
      fractionDigits: 0,
      type: '',
    },
  };

  it('renders product information correctly', () => {
    render(<CartProductCard data={mockData} usePromo={0} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('variant-1')).toBeInTheDocument();
    expect(screen.getByAltText('Test Image')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('$8.00')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /delete item/i })
    ).toBeInTheDocument();
  });

  it('displays discounted price when usePromo is provided', () => {
    render(<CartProductCard data={mockData} usePromo={10} />);

    expect(screen.getByText('$7.20')).toBeInTheDocument();

    expect(screen.getByText('$10.00')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', async () => {
    const mockDelete = vi.fn();
    render(
      <CartProductCard data={mockData} onDelete={mockDelete} usePromo={0} />
    );

    await userEvent.click(screen.getByRole('button', { name: /delete item/i }));
    expect(mockDelete).toHaveBeenCalledWith('item-1');
  });

  it('disables delete button when isDeleting is true', () => {
    render(<CartProductCard data={mockData} isDeleting={true} usePromo={0} />);

    expect(screen.getByRole('button', { name: /delete item/i })).toBeDisabled();
  });

  it('does not show discount when no discounted price exists', () => {
    const dataWithoutDiscount = {
      ...mockData,
      price: {
        value: { centAmount: 1000, currencyCode: 'USD' },
        discounted: undefined,
      },
    };

    render(<CartProductCard data={dataWithoutDiscount} usePromo={0} />);

    expect(screen.queryByText('$8.00')).not.toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
  });

  it('handles missing image label gracefully', () => {
    const dataWithoutImageLabel = {
      ...mockData,
      variant: {
        ...mockData.variant,
        images: [{ url: 'test.jpg', label: undefined }],
      },
    };

    render(<CartProductCard data={dataWithoutImageLabel} usePromo={0} />);

    expect(screen.getByAltText('product image')).toBeInTheDocument();
  });
});
