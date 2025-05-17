import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Help from '../src/components/layout/help/Help';

vi.mock('../src/components/Help.module.scss', () => ({
  default: {
    help: 'help',
    container: 'container',
    title: 'title',
    wrapper: 'wrapper',
    paragraph: 'paragraph',
    linksContainer: 'linksContainer',
    linkText: 'linkText',
    link: 'link',
  },
}));

describe('Help Component', () => {
  it('renders title and paragraph', () => {
    render(<Help />);

    expect(screen.getByText('Help Center')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Welcome to Dyson's Support Center! We're here to assist with your queries, troubleshooting, and product care./
      )
    ).toBeInTheDocument();
  });

  it('renders contact links with correct attributes and classes', () => {
    render(<Help />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'mailto:help@dyson.com');
    expect(links[0]).toHaveAttribute(
      'aria-label',
      'Send email to help@dyson.com'
    );
    expect(links[0]).toHaveTextContent('help@dyson.com');

    expect(links[1]).toHaveAttribute('href', 'tel:+1-800-555-1234');
    expect(links[1]).toHaveAttribute(
      'aria-label',
      'Call support at +1-800-555-1234'
    );
    expect(links[1]).toHaveTextContent('+1-800-555-1234');
  });
});