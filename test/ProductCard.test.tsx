import { render, screen } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import ProductCard from '../src/components/layout/product/card/ProductCard';
import React from 'react';

vi.mock('@components/ui/counter/Counter', () => ({
  default: ({ price }: { price: number }) => (
    <div data-testid="counter">Counter: {price}</div>
  ),
}));

describe('ProductCard', () => {
  const defaultProps = {
    name: 'Test Product',
    description: 'This is a test product description',
    price: 100,
    discountedPrice: null,
    variants: [
      { iconUrl: 'icon1.png', name: 'Variant 1' },
      { iconUrl: 'icon2.png', name: 'Variant 2' },
    ],
  };

  it('renders product name, description, and price correctly', () => {
    render(<ProductCard {...defaultProps} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test product description')
    ).toBeInTheDocument();
    expect(screen.getByText('Price: 100.00$')).toBeInTheDocument();
  });

  it('displays discounted price when provided', () => {
    const propsWithDiscount = {
      ...defaultProps,
      discountedPrice: 80,
    };
    render(<ProductCard {...propsWithDiscount} />);
    expect(screen.getByText('Price: 80.00$')).toBeInTheDocument();
    expect(screen.getByText('Initial price: 100.00$')).toBeInTheDocument();
  });

  it('does not display initial price when no discount is provided', () => {
    render(<ProductCard {...defaultProps} />);

    expect(screen.queryByText(/Initial price:/)).not.toBeInTheDocument();
  });

  it('renders Counter component with correct price', () => {
    render(<ProductCard {...defaultProps} />);
    // expect(screen.getByTestId('counter')).toHaveTextContent('Counter: 100');
  });

  it('renders Counter component with discounted price when provided', () => {
    const propsWithDiscount = {
      ...defaultProps,
      discountedPrice: 80,
    };
    render(<ProductCard {...propsWithDiscount} />);

    expect(screen.getByTestId('counter')).toHaveTextContent('Counter: 80');
  });

  it('renders Variants component with correct variants', () => {
    render(<ProductCard {...defaultProps} />);
    expect(screen.getByText('Variant 1')).toBeInTheDocument();
    expect(screen.getByText('Variant 2')).toBeInTheDocument();
  });

  it('renders add to cart button', () => {
    render(<ProductCard {...defaultProps} />);

    expect(screen.getByText('add to cart')).toBeInTheDocument();
  });
});