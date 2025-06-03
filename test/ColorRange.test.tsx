import { render, screen } from '@testing-library/react';
import { ColorRange } from '../src/components/ui/sort/color-range/ColorRange';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom/vitest';

const createElement = (type, props, ...children) => {
  return React.createElement(type, props, ...children);
};

vi.mock('@mui/material', () => ({
  Typography: (props: { children: unknown }) => {
    const { children } = props;
    return createElement('h6', { 'data-testid': 'typography' }, children);
  },
  FormGroup: (props: { children: unknown }) => {
    const { children } = props;
    return createElement('div', { 'data-testid': 'form-group' }, children);
  },
  FormControlLabel: (props: { control: unknown; label: unknown }) => {
    const { control, label } = props;
    return createElement(
      'div',
      { 'data-testid': `form-control-label-${label}` },
      control,
      createElement('span', null, label)
    );
  },
  Checkbox: (props: { checked: unknown; onChange: unknown }) => {
    const { checked, onChange } = props;
    return createElement('input', {
      type: 'checkbox',
      'data-testid': `checkbox-${checked}`,
      checked,
      onChange,
    });
  },
}));

describe('ColorRange Component', () => {
  const colors = ['Red', 'Blue', 'Green'];
  const onChange = vi.fn();

  beforeEach(() => {
    render(
      <ColorRange
        colors={colors}
        selectedColors={['Red']}
        onChange={onChange}
      />
    );
  });

  it('renders all color options', () => {
    expect(screen.getByTestId('typography')).toHaveTextContent('Color');
    expect(screen.getByTestId('form-group')).toBeInTheDocument();
    expect(screen.getByText('Red')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
    expect(screen.getByText('Green')).toBeInTheDocument();
  });

  it('handles color selection and deselection', () => {
    expect(screen.getByTestId('checkbox-true')).toBeChecked();
    expect(screen.getAllByTestId('checkbox-false').length).toBe(2);
  });
});
