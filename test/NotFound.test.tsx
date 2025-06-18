import { render, screen } from '@testing-library/react';
import { MemoryRouter, NavigateFunction } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotFound } from '../src/components/layout/not-found/Notfound';

vi.mock('@mui/material', () => ({
  Button: ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
  }) => (
    <button className={className} onClick={onClick} data-testid="mui-button">
      {children}
    </button>
  ),
}));

const navigateMock = vi.fn<NavigateFunction>();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('NotFound Component', () => {
  beforeEach(() => {
    navigateMock.mockClear();
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
  });

  it('renders the not found heading', () => {
    expect(
      screen.getByText(/oops! this page doesn’t exist/i)
    ).toBeInTheDocument();
  });

  it('renders the home and back buttons', () => {
    const buttons = screen.getAllByTestId('mui-button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent('home');
    expect(buttons[1]).toHaveTextContent('back');
  });

  it('navigates to home when home button is clicked', async () => {
    const user = userEvent.setup();
    const homeButton = screen.getAllByTestId('mui-button')[0];
    await user.click(homeButton);
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('navigates back when back button is clicked', async () => {
    const user = userEvent.setup();
    const backButton = screen.getAllByTestId('mui-button')[1];
    await user.click(backButton);
    expect(navigateMock).toHaveBeenCalledWith(-1);
  });
});
