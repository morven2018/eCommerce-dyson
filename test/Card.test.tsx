import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Card } from '../src/components/ui/cards/Card';

const mockGetCartIdFromLS = vi.fn();
const mockApiCreateNewCart = vi.fn();
const mockApiAddProductToCart = vi.fn();
const mockGetTokenFromLS = vi.fn();

interface LinkProps {
  children: React.ReactNode;
  to: string;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

vi.mock('react-router-dom', () => ({
  Link: ({ children, ...props }: LinkProps) => (
    <a href={props.to} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('@shared/api/local-storage/getCartIdFromLS', () => ({
  getCartIdFromLS: () => mockGetCartIdFromLS(),
}));

vi.mock('@shared/api/commerce-tools/apiCreateNewCart', () => ({
  apiCreateNewCart: () => mockApiCreateNewCart(),
}));

vi.mock('@shared/api/commerce-tools/apiAddProductToCart', () => ({
  apiAddProductToCart: () => mockApiAddProductToCart(),
}));

vi.mock('@shared/api/local-storage/getTokenFromLS', () => ({
  getTokenFromLS: () => mockGetTokenFromLS(),
}));

describe('Card Component', () => {
  const mockProps = {
    id: 'prod-123',
    name: 'Dyson Supersonic Hair Dryer',
    description: 'Professional hair dryer with intelligent heat control',
    price: 39900,
    discountedPrice: 29900,
    src: 'dyson-hair-dryer.jpg',
    isInCart: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mockGetTokenFromLS.mockReturnValue('mock-access-token');
    mockGetCartIdFromLS.mockReturnValue(null);
    mockApiCreateNewCart.mockResolvedValue({ id: 'new-cart-456' });
  });

  it('renders correctly with all props', () => {
    render(<Card {...mockProps} />);
    expect(screen.getByAltText('Product picture')).toBeInTheDocument();
    expect(screen.getByText('Dyson Supersonic Hair Dryer')).toBeInTheDocument();
    expect(screen.getByText('Price: $299.00')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add to Cart' })
    ).toBeInTheDocument();
  });

  it('handles "Add to Cart" click with existing cart', async () => {
    mockGetCartIdFromLS.mockReturnValue('cart-123');
    render(<Card {...mockProps} />);
    const button = screen.getByRole('button', { name: 'Add to Cart' });
    fireEvent.click(button);
    expect(mockApiCreateNewCart).not.toHaveBeenCalled();
  });
});
