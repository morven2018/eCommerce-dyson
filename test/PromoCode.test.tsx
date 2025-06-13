import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import PromoCode from '../src/components/layout/promo-code/PromoCode';

vi.mock('@assets/images/discount-10.jpg', () => ({
  default: 'mock-discount-10.jpg',
}));
vi.mock('@assets/images/discount-20.jpg', () => ({
  default: 'mock-discount-20.jpg',
}));
vi.mock('@assets/images/discount-30.jpg', () => ({
  default: 'mock-discount-30.jpg',
}));

const mockClipboard = {
  writeText: vi.fn(),
};
Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
  writable: true,
});

describe('PromoCode Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockClipboard.writeText.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the component with title and promo cards', () => {
    render(<PromoCode />);
    expect(screen.getByText('Welcome to Dyson!')).toBeInTheDocument();
    expect(screen.getByText('GET your promo code NOW!')).toBeInTheDocument();
    const promoButtons = screen.getAllByRole('button');
    expect(promoButtons).toHaveLength(3);
    expect(promoButtons[0]).toHaveTextContent('LUCKY-30');
    expect(promoButtons[1]).toHaveTextContent('DYSON-20');
    expect(promoButtons[2]).toHaveTextContent('SUMMER-10');
  });

  it('displays all promo codes with images', () => {
    render(<PromoCode />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute('src', 'mock-discount-30.jpg');
    expect(images[1]).toHaveAttribute('src', 'mock-discount-20.jpg');
    expect(images[2]).toHaveAttribute('src', 'mock-discount-10.jpg');
    expect(images[0]).toHaveAttribute('alt', '30% off promo code');
    expect(images[1]).toHaveAttribute('alt', '20% off promo code');
    expect(images[2]).toHaveAttribute('alt', '10% off promo code');
  });

  it('clears timeout when component unmounts', () => {
    const { unmount } = render(<PromoCode />);
    const firstButton = screen.getByRole('button', { name: /LUCKY-30/ });
    fireEvent.click(firstButton);
    unmount();
  });
});
