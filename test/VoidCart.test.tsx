import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import VoidCartArea from '../src/components/layout/cart/VoidCartArea.module';

vi.mock(
  'src/components/layout/cart/src/components/layout/cart/Cart.module.scss',
  () => ({
    default: {
      cartTable: 'cartTable',
      cartHeader: 'cartHeader',
      cartHeaderInfo: 'cartHeaderInfo',
      items: 'items',
      voidIcon: 'voidIcon',
      button: 'button',
    },
  })
);

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('VoidCart Component', () => {
  it('renders title, total sum, items and text message', () => {
    render(
      <MemoryRouter>
        <VoidCartArea />
      </MemoryRouter>
    );

    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Total: $0')).toBeInTheDocument();
    expect(screen.getByText('No items added')).toBeInTheDocument();
    expect(screen.getByText('Cart is empty')).toBeInTheDocument();
  });

  it('renders component image', () => {
    render(
      <MemoryRouter>
        <VoidCartArea />
      </MemoryRouter>
    );

    const image = screen.getByAltText('Void Cart');
    expect(image).toBeInTheDocument();
  });

  it('navigates to /catalog when the button is clicked', () => {
    const mockNavigate = vi.fn();
    (useNavigate as vi.Mock).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <VoidCartArea />
      </MemoryRouter>
    );

    const button = screen.getByText('see our catalog');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/catalog');
  });
});
