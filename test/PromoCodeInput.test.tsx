import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PromoCodeInput } from '../src/components/ui/inputs/inputPromo';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@shared/utlis/validatePromocode', () => ({
  default: vi.fn((code: string) => {
    if (code === 'VALID') {
      return { isValid: true, error: null };
    }
    return { isValid: false, error: 'Invalid promo code' };
  }),
}));

describe('PromoCodeInput', () => {
  const mockOnApply = vi.fn();
  const mockOnReset = vi.fn();

  beforeEach(() => {
    mockOnApply.mockReset();
    mockOnReset.mockReset();
  });

  const renderComponent = (props = {}) => {
    const defaultProps = {
      cartTotal: 100,
      onApply: mockOnApply,
      onReset: mockOnReset,
      value: '',
      isApplied: false,
      ...props,
    };
    return render(<PromoCodeInput {...defaultProps} />);
  };

  it('renders correctly in ready state', () => {
    renderComponent();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('Enter your promo code')).toBeInTheDocument();
  });

  it('disables apply button when input is empty', () => {
    renderComponent();
    const applyButton = screen.getByRole('button', {
      name: /Apply promo code/i,
    });
    expect(applyButton).toBeDisabled();
  });

  it('shows loading spinner when processing', async () => {
    mockOnApply.mockResolvedValue(true);
    renderComponent({ value: 'VALID' });

    fireEvent.click(screen.getByRole('button', { name: /Apply promo code/i }));
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    await waitFor(() => expect(mockOnApply).toHaveBeenCalled());
  });

  it('applies valid promo code', async () => {
    mockOnApply.mockResolvedValue(true);
    renderComponent();

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'VALID' } });
    fireEvent.click(screen.getByRole('button', { name: /Apply promo code/i }));

    await waitFor(() => {
      expect(mockOnApply).toHaveBeenCalledWith('VALID');
      expect(screen.getByText('Promo code applied')).toBeInTheDocument();
    });
  });

  it('shows error for invalid promo code', async () => {
    renderComponent();

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'INVALID' } });
    fireEvent.click(screen.getByRole('button', { name: /Apply promo code/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid promo code')).toBeInTheDocument();
      expect(mockOnApply).not.toHaveBeenCalled();
    });
  });

  it('resets promo code on clear', async () => {
    renderComponent({ value: 'VALID' });

    mockOnApply.mockResolvedValue(false);
    fireEvent.click(screen.getByRole('button', { name: /Apply promo code/i }));
    await waitFor(() => expect(mockOnApply).toHaveBeenCalled());

    fireEvent.click(screen.getByRole('button', { name: /Remove promo code/i }));
    expect(mockOnReset).toHaveBeenCalled();
    expect(screen.getByText('Enter your promo code')).toBeInTheDocument();
  });

  it('disables input when applied or loading', () => {
    const { rerender } = renderComponent({ value: 'VALID', isApplied: true });
    expect(screen.getByRole('textbox')).toBeDisabled();

    rerender(
      <PromoCodeInput
        cartTotal={100}
        onApply={mockOnApply}
        onReset={mockOnReset}
        value="VALID"
        isApplied={false}
        isLoading={true}
      />
    );
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
