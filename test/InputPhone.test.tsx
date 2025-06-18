import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputPhone from '../src/components/ui/inputs/inputPhone';

describe('InputPhone', () => {
  it('renders with default props', () => {
    render(<InputPhone />);

    const input = screen.getByRole('textbox', { name: /phone number/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'tel');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const handleChange = vi.fn();
    render(<InputPhone onChange={handleChange} />);

    const input = screen.getByRole('textbox', { name: /phone number/i });
    await userEvent.type(input, '1234567890');

    expect(handleChange).toHaveBeenCalledTimes(10);
  });

  it('shows edit/save button when readOnly or isEditing is true', () => {
    const { rerender } = render(<InputPhone readOnly onEditClick={vi.fn()} />);

    // Проверяем кнопку редактирования
    const editButton = screen.getByRole('button', { name: /toggle edit/i });
    expect(editButton).toBeInTheDocument();
    expect(
      editButton.querySelector('[data-testid="EditIcon"]')
    ).toBeInTheDocument();

    // Проверяем кнопку сохранения при isEditing
    rerender(<InputPhone isEditing onEditClick={vi.fn()} />);
    const saveButton = screen.getByRole('button', { name: /toggle edit/i });
    expect(saveButton).toBeInTheDocument();
    expect(
      saveButton.querySelector('[data-testid="SaveIcon"]')
    ).toBeInTheDocument();
  });

  it('calls onEditClick when button is clicked', async () => {
    const handleEditClick = vi.fn();
    render(<InputPhone readOnly onEditClick={handleEditClick} />);

    await userEvent.click(screen.getByRole('button', { name: /toggle edit/i }));
    expect(handleEditClick).toHaveBeenCalledTimes(1);
  });

  it('displays error and helper text when error is true', () => {
    render(<InputPhone error helperText="Invalid phone number" />);

    expect(screen.getByText('Invalid phone number')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('disables input when disabled is true', () => {
    render(<InputPhone disabled />);

    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
