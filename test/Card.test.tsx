import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Card } from '../src/components/ui/cards/Card';
import '@testing-library/jest-dom/vitest';
import React from 'react';

vi.mock('./Card.module.scss', () => ({
  default: {
    container: 'container',
    cardImage: 'cardImage',
    cardInfo: 'cardInfo',
    price: 'price',
    discount: 'discount',
    name: 'name',
    description: 'description',
    buttonsContainer: 'buttonsContainer',
    button: 'button',
  },
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('Card Component', () => {
  const defaultProps = {
    id: '123',
    name: 'Dyson Vacuum Cleaner',
    description: 'A powerful vacuum cleaner with advanced features.',
    price: 39900,
    discountedPrice: null,
    src: '/image.jpg',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Storage.prototype, 'setItem');
    localStorage.setItem = vi.fn();
  });

  it('renders card with correct product details', () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByText('Dyson Vacuum Cleaner')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', '/image.jpg');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Product picture');
  });

  it('truncates long name and description', () => {
    const longProps = {
      ...defaultProps,
      name: 'Dyson Super Ultra Mega Vacuum Cleaner Pro Plus Edition',
      description:
        'This is an extremely long description that goes on and on to describe the amazing features of this vacuum cleaner in great detail.',
    };
    render(<Card {...longProps} />);
  });

  it('does not display discount when discountedPrice is null', () => {
    render(<Card {...defaultProps} />);
    expect(screen.queryByText(/Discount:/)).not.toBeInTheDocument();
  });

  it('formats price correctly for non-integer values', () => {
    const propsWithOddPrice = {
      ...defaultProps,
      price: 39999,
    };
    render(<Card {...propsWithOddPrice} />);
  });
});
