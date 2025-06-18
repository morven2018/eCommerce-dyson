import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import InputDate from '../src/components/ui/inputs/datePicker';

describe('InputDate', () => {
  beforeEach(() => {
    dayjs.locale('en');
  });

  it('renders with default props', () => {
    render(<InputDate />);

    const input = screen.getByLabelText('Date of birth');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'date');
    expect(input).toHaveValue('');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('displays initial value correctly', () => {
    const testDate = dayjs('2023-01-15');
    render(<InputDate value={testDate} />);

    expect(screen.getByLabelText('Date of birth')).toHaveValue('2023-01-15');
  });

  it('calls onChange when date is selected', async () => {
    const handleChange = vi.fn();
    render(<InputDate onChange={handleChange} />);

    const input = screen.getByLabelText('Date of birth');
    await userEvent.type(input, '2023-01-15');

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(dayjs('2023-01-15'));
  });

  it('calls onEditClick when edit/save button is clicked', async () => {
    const handleEditClick = vi.fn();
    render(<InputDate readOnly onEditClick={handleEditClick} />);

    await userEvent.click(screen.getByRole('button'));
    expect(handleEditClick).toHaveBeenCalledTimes(1);
  });

  it('displays error and helper text when error is true', () => {
    render(<InputDate error helperText="Invalid date" />);

    expect(screen.getByText('Invalid date')).toBeInTheDocument();
  });

  it('disables input when disabled is true', () => {
    render(<InputDate disabled />);

    expect(screen.getByLabelText('Date of birth')).toBeDisabled();
  });

  it('does not show button when onEditClick is not provided', () => {
    render(<InputDate readOnly />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('handles null value correctly', () => {
    render(<InputDate value={null} />);

    expect(screen.getByLabelText('Date of birth')).toHaveValue('');
  });

  it('applies readOnly state correctly', () => {
    render(<InputDate readOnly value={dayjs('2023-01-15')} />);

    const input = screen.getByLabelText('Date of birth');
    expect(input).toHaveAttribute('readonly');
  });

  it('allows editing when isEditing is true even if readOnly is true', () => {
    render(<InputDate readOnly isEditing value={dayjs('2023-01-15')} />);

    const input = screen.getByLabelText('Date of birth');
    expect(input).not.toHaveAttribute('readonly');
  });
});
