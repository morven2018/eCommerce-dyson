import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from '../src/components/common/forms/LoginForm';
import { AuthContext } from '../src/shared/context/auth-hooks';

vi.mock('@mui/icons-material', () => ({
  default: () => <span>MockIcon</span>,
  ViewAgendaTwoTone: () => <span>MockIcon</span>,
  Visibility: () => <span data-testid="visibility-icon">Visibility</span>,
  VisibilityOff: () => (
    <span data-testid="visibility-off-icon">VisibilityOff</span>
  ),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
      <a href={to} data-testid="mock-link">
        {children}
      </a>
    ),
  };
});

vi.mock('../src/shared/context/auth-hooks', async () => {
  const actual = await vi.importActual('../src/shared/context/auth-hooks');
  return {
    ...actual,
    useAuth: () => {
      console.log('Mocking useAuth');
      return React.useContext(AuthContext);
    },
  };
});

const MockAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUserUnauthorized, setIsUserUnauthorized] = React.useState(true);
  return (
    <AuthContext.Provider value={{ isUserUnauthorized, setIsUserUnauthorized }}>
      {children}
    </AuthContext.Provider>
  );
};

describe('LoginForm Component', () => {
  it('renders the form with submit button and text', () => {
    render(
      <MockAuthProvider>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </MockAuthProvider>
    );

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    expect(submitButton).toBeInTheDocument();

    const forgotPasswordText = screen.getByText(/forgot password/i);
    expect(forgotPasswordText).toBeInTheDocument();

    const registerText = screen.getByText(/don’t have an account/i);
    expect(registerText).toBeInTheDocument();
  });

  it('renders email and password inputs', () => {
    render(
      <MockAuthProvider>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </MockAuthProvider>
    );

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toBeInTheDocument();
  });

  it('renders register link with correct href', () => {
    render(
      <MockAuthProvider>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </MockAuthProvider>
    );

    const registerLink = screen.getByTestId('mock-link');
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
    expect(registerLink).toHaveTextContent('Register here');
  });

  it('renders reset password link', () => {
    render(
      <MockAuthProvider>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </MockAuthProvider>
    );

    const resetLink = screen.getByRole('link', { name: /reset password/i });
    expect(resetLink).toBeInTheDocument();
    expect(resetLink).toHaveAttribute('href', '#');
  });
});
