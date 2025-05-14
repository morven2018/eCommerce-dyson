import { render, fireEvent } from '@testing-library/react';
import { expect, describe, it, vi, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Burger } from '../src/components/ui/burger/burger/burger';
import React from 'react';

describe('Burger Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    const { container } = render(
      <Burger isActive={false} onClick={handleClick} />
    );
    const svg = container.querySelector('svg[viewBox="0 0 100 100"]');
    if (!svg) throw new Error('SVG not found');
    fireEvent.click(svg);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});