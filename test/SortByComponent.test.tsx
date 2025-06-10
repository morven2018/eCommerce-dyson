import { render, screen } from '@testing-library/react';
import { SortByComponent } from '../src/components/ui/sort/SortByComponent';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { createElement } from 'react';
import '@testing-library/jest-dom/vitest';

type SortOption =
  | 'normal'
  | 'price_asc'
  | 'price_desc'
  | 'name_asc'
  | 'name_desc';

vi.mock('@mui/icons-material/ArrowDropDown', () => ({
  default: () =>
    createElement(
      'span',
      { 'data-testid': 'arrow-drop-down-icon' },
      'Dropdown'
    ),
}));

describe('SortByComponent', () => {
  const onSortChange = vi.fn();
  const initialSortOption: SortOption = 'normal';

  beforeEach(() => {
    render(
      <SortByComponent
        sortOption={initialSortOption}
        onSortChange={onSortChange}
      />
    );
  });

  it('renders with initial sort option', () => {
    expect(screen.getByDisplayValue('normal')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-drop-down-icon')).toBeInTheDocument();
  });
});
