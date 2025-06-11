import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Strengths from '../src/components/layout/strengths/Strengths';

// Mock image imports
vi.mock('../../../assets/images/strength1.jpeg', () => 'test-strength1.jpeg');
vi.mock('../../../assets/images/strength2.jpeg', () => 'test-strength2.jpeg');
vi.mock('../../../assets/images/strength3.jpeg', () => 'test-strength3.jpeg');
vi.mock('../../../assets/images/strength4.jpeg', () => 'test-strength4.jpeg');

describe('Strengths Component', () => {
  it('renders the section title correctly', () => {
    render(<Strengths />);
    expect(screen.getByText('WHY choose us?')).toBeInTheDocument();
  });

  it('renders all four strength cards', () => {
    render(<Strengths />);
    const cards = screen.getAllByTestId('strength-card');
    expect(cards).toHaveLength(4);
  });

  it('displays all card headers with correct content', () => {
    render(<Strengths />);
    expect(screen.getByText('Innovative Technology')).toBeInTheDocument();
    expect(screen.getByText('Powerful Performance')).toBeInTheDocument();
    expect(screen.getByText('Ergonomic Design')).toBeInTheDocument();
    expect(screen.getByText('Durability and Longevity')).toBeInTheDocument();
  });

  it('renders all images with correct alt text', () => {
    render(<Strengths />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(4);

    expect(images[0]).toHaveAttribute('alt', 'Scientist in a lab');
    expect(images[1]).toHaveAttribute('alt', 'Dyson vacuum cleaner');
    expect(images[2]).toHaveAttribute('alt', 'Dyson Headphones');
    expect(images[3]).toHaveAttribute('alt', 'Dyson Hair Cair product');
  });

  it('renders all card text content', () => {
    render(<Strengths />);
    const paragraphs = screen.getAllByTestId('card-text');
    expect(paragraphs).toHaveLength(4);

    expect(paragraphs[0]).toHaveTextContent(/cutting-edge technology/i);
    expect(paragraphs[1]).toHaveTextContent(/exceptional suction power/i);
    expect(paragraphs[2]).toHaveTextContent(/crafted for comfort/i);
    expect(paragraphs[3]).toHaveTextContent(/advanced airflow technology/i);
  });
});
