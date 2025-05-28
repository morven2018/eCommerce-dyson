import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import Counter from '../src/components/ui/counter/Counter';
import '@testing-library/jest-dom/vitest';

describe('Counter', () => {
  const defaultProps = {
    price: 10.99,
  };

  it('renders initial quantity and total sum correctly', () => {
    render(<Counter {...defaultProps} />);
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });

  it('increments quantity when plus button is clicked', () => {
    render(<Counter {...defaultProps} />);
    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });

  it('decrements quantity when minus button is clicked and quantity > 1', () => {
    render(<Counter {...defaultProps} />);

    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);

    const minusButton = screen.getByText('-');
    fireEvent.click(minusButton);
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });

  it('disables decrement button when quantity is 1', () => {
    render(<Counter {...defaultProps} />);

    const minusButton = screen.getByText('-');
    expect(minusButton).toBeDisabled();
  });

  it('enables decrement button when quantity is greater than 1', () => {
    render(<Counter {...defaultProps} />);

    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);
    const minusButton = screen.getByText('-');
    expect(minusButton).not.toBeDisabled();
  });

  it('renders correct total sum for different price values', () => {
    const highPriceProps = { price: 50.25 };
    render(<Counter {...highPriceProps} />);

    expect(screen.getByText('Total: 50.25$')).toBeInTheDocument();
    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);
  });

  it('input is read-only', () => {
    render(<Counter {...defaultProps} />);

    const input = screen.getByDisplayValue('1');
    expect(input).toHaveAttribute('readOnly');
  });
});
