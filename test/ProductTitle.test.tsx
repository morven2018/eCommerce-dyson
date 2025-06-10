import { render, screen } from '@testing-library/react';
import ProductTitle from '../src/components/layout/product/title/ProductTitle';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('ProductTitle Component', () => {
  const productName = 'Dyson Airwrap';
  const productPrice = 499.99;

  it('renders the product name correctly', () => {
    render(<ProductTitle name={productName} price={productPrice} />);

    const nameElement = screen.getByRole('heading', {
      level: 2,
      name: productName,
    });
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveTextContent(productName);
  });

  it('renders the product price correctly with two decimal places', () => {
    render(<ProductTitle name={productName} price={productPrice} />);

    const priceElement = screen.getByRole('heading', {
      level: 2,
      name: `$${productPrice.toFixed(2)}`,
    });
    expect(priceElement).toBeInTheDocument();
    expect(priceElement).toHaveTextContent('$499.99');
  });

  it('handles price without decimal places correctly', () => {
    render(<ProductTitle name={productName} price={500} />);

    const priceElement = screen.getByRole('heading', {
      level: 2,
      name: '$500.00',
    });
    expect(priceElement).toBeInTheDocument();
    expect(priceElement).toHaveTextContent('$500.00');
  });
});
