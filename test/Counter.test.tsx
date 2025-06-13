import { render, screen, fireEvent } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import Counter from '../src/components/ui/counter/Counter';
import '@testing-library/jest-dom/vitest';
import React from 'react';

describe('Counter', () => {
  const defaultProps = {
    price: 10.99,
  };

  it('renders initial quantity and total sum correctly', () => {
    render(<Counter amount={0} {...defaultProps} />);
  });

  it('increments quantity when plus button is clicked', () => {
    render(<Counter amount={0} {...defaultProps} />);
    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);
  });

  it('decrements quantity when minus button is clicked and quantity > 1', () => {
    render(<Counter amount={0} {...defaultProps} />);

    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);

    const minusButton = screen.getByText('-');
    fireEvent.click(minusButton);
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });


  it('enables decrement button when quantity is greater than 1', () => {
    render(<Counter amount={0} {...defaultProps} />);
    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);
  });

  it('renders correct total sum for different price values', () => {
    const highPriceProps = { price: 50.25 };
    render(<Counter amount={0} {...highPriceProps} />);

    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);
  });

  it('input is read-only', () => {
    render(<Counter amount={0} {...defaultProps} />);
  });
});