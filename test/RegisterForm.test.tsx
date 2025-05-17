import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RegisterForm } from '../src/components/common/forms/register-form/RegisterForm';
import React from 'react';
import '@testing-library/jest-dom/vitest';

vi.mock('@mui/icons-material', () => ({
  default: () => <span>MockIcon</span>,
  ViewAgendaTwoTone: () => <span>MockIcon</span>,
  Visibility: () => <span data-testid="visibility-icon">Visibility</span>,
  VisibilityOff: () => (
    <span data-testid="visibility-off-icon">VisibilityOff</span>
  ),
}));

vi.mock('../../../../shared/api/commerce-tools/new-customer', () => ({
  register: vi.fn(),
}));

describe('RegisterForm', () => {
  it('renders the initial step with contact information fields', () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('generate')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone number')).toBeInTheDocument();
    expect(screen.getByLabelText('First name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last name')).toBeInTheDocument();
  });

  it('moves to next step when form is valid', async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'ValidPassword1!' },
    });
    fireEvent.change(screen.getByLabelText('Phone number'), {
      target: { value: '+1234567890' },
    });
    fireEvent.change(screen.getByLabelText('First name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText('Last name'), {
      target: { value: 'Doe' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
  });

  it('allows going back to previous step', async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'ValidPassword1!' },
    });
    fireEvent.change(screen.getByLabelText('Phone number'), {
      target: { value: '+1234567890' },
    });
    fireEvent.change(screen.getByLabelText('First name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText('Last name'), {
      target: { value: 'Doe' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
  });
});
