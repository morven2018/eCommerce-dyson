import { render, screen } from '@testing-library/react';
import { CategoryPage } from '../src/pages/catalog/category/CategoryPage';
import { vi, describe, it, beforeEach, afterEach, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

vi.mock('@shared/api/commerce-tools/getProductsByIdCategory', () => ({
  getProductsByIdCategory: vi.fn(),
}));

vi.mock('@shared/api/local-storage/getTokenFromLS', () => ({
  getTokenFromLS: vi.fn(() => 'mock-token'),
}));

vi.mock('@services/DialogService', () => ({
  openDialog: vi.fn(),
}));

vi.mock('@shared/constants/categories', () => ({
  getNameByPath: vi.fn((path) => {
    switch (path) {
      case '/catalog/vacuums':
        return 'Vacuums';
      case '/catalog/hair-care':
        return 'Hair Care';
      case '/catalog/heater':
        return 'Heaters';
      case '/catalog/headphones':
        return 'Headphones';
      case '/catalog/lighting':
        return 'Lighting';
      default:
        return 'Unknown';
    }
  }),
}));

vi.mock('@shared/api/commerce-tools/config', () => ({
  commercetoolsConfig: {
    idCategoryVacuums: 'vacuum-id',
    idCategoryHairBeauty: 'hair-care-id',
    idCategoryAirHeaters: 'heater-id',
    idCategoryHeadphones: 'headphones-id',
    idCategoryLighting: 'lighting-id',
  },
}));

describe('CategoryPage Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders loading state initially', () => {
    render(<CategoryPage page="vacuums" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error dialog on fetch failure', async () => {
    render(<CategoryPage page="vacuums" />);
  });
});
