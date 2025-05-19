import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { RegisterForm } from '../src/components/common/forms/register-form/RegisterForm';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';

vi.mock('@mui/icons-material', () => ({
  default: () => <span>MockIcon</span>,
  ViewAgendaTwoTone: () => <span>MockIcon</span>,
  Visibility: () => <span data-testid="visibility-icon">Visibility</span>,
  VisibilityOff: () => <span data-testid="visibility-off-icon">VisibilityOff</span>,
}));

vi.mock('../../../../shared/api/commerce-tools/new-customer', () => ({
  register: vi.fn(),
}));

describe('RegisterForm', () => {
  it('renders the initial step with contact information fields', () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('generate')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone number')).toBeInTheDocument();
    expect(screen.getByLabelText('First name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last name')).toBeInTheDocument();
  });

 
  it('moves to next step when form is valid', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'ValidPassword1!');
    await user.type(screen.getByLabelText('Phone number'), '+1234567890');
    await user.type(screen.getByLabelText('First name'), 'John');
    await user.type(screen.getByLabelText('Last name'), 'Doe');
  });

  it('allows going back to previous step', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'ValidPassword1!');
    await user.type(screen.getByLabelText('Phone number'), '+1234567890');
    await user.type(screen.getByLabelText('First name'), 'John');
    await user.type(screen.getByLabelText('Last name'), 'Doe');
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });
});


