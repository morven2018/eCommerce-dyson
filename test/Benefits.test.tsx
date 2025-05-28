import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import Benefits from '../src/components/layout/product/benefits/Benefits';
import React from 'react';

describe('Benefits', () => {
  it('renders the title and subtitle correctly', () => {
    render(<Benefits />);

    expect(screen.getByText('Buy from Dyson')).toBeInTheDocument();
    expect(screen.getByText('Benefits')).toBeInTheDocument();
  });

  it('renders all benefits with correct text and image classes', () => {
    render(<Benefits />);

    const benefitTexts = [
      '2-Year Limited Warranty on All Products',
      'Free Shipping on Every Order',
      '30-Day Money-Back Guarantee',
    ];

    benefitTexts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
});
