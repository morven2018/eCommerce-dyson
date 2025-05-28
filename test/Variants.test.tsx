import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import { Variants } from '../src/components/layout/product/variants/Variants';
import '@testing-library/jest-dom/vitest';

describe('Variants', () => {
  const defaultProps = {
    variants: [
      { iconUrl: 'icon1.png', name: 'Variant 1' },
      { iconUrl: 'icon2.png', name: 'Variant 2' },
      { iconUrl: 'icon3.png', name: 'Variant 3' },
    ],
  };

  it('renders variant images with correct src and alt attributes', () => {
    render(<Variants {...defaultProps} />);

    defaultProps.variants.forEach((variant, index) => {
      const img = screen.getByAltText(`Variant ${index + 1}`);
      expect(img).toHaveAttribute('src', variant.iconUrl);
    });
  });

  it('renders variant names correctly', () => {
    render(<Variants {...defaultProps} />);
    defaultProps.variants.forEach((variant) => {
      expect(screen.getByText(variant.name)).toBeInTheDocument();
    });
  });
});
