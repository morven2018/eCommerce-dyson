import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Media from '../src/components/layout/media/Media';
import '@testing-library/jest-dom/vitest';

vi.mock('../src/components/Media.module.scss', () => ({
  default: {
    media: 'media',
    title: 'title',
    subtitle: 'subtitle',
    container: 'container',
    link: 'link',
    linkX: 'linkX',
    icon: 'icon',
    iconX: 'iconX',
    iconI: 'iconI',
    iconY: 'iconY',
    iconT: 'iconT',
  },
}));

describe('Media Component', () => {
  it('renders title and subtitle', () => {
    render(<Media />);

    expect(screen.getByText('Follow us on social media')).toBeInTheDocument();
    expect(
      screen.getByText('For the latest product updates and innovations!')
    ).toBeInTheDocument();
  });

  it('renders social media links with correct attributes and classes', () => {
    render(<Media />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);

    expect(links[0]).toHaveAttribute('href', 'https://x.com/dyson');
    expect(links[0]).toHaveAttribute('rel', 'noreferrer');
    expect(links[0]).toHaveAttribute('target', '_blank');

    expect(links[1]).toHaveAttribute(
      'href',
      'https://www.instagram.com/dysonusa/'
    );
    expect(links[1]).toHaveAttribute('rel', 'noreferrer');
    expect(links[1]).toHaveAttribute('target', '_blank');

    expect(links[2]).toHaveAttribute('href', 'https://www.youtube.com/dyson');
    expect(links[2]).toHaveAttribute('rel', 'noreferrer');
    expect(links[2]).toHaveAttribute('target', '_blank');

    expect(links[3]).toHaveAttribute(
      'href',
      'https://www.tiktok.com/@dyson_usa'
    );
    expect(links[3]).toHaveAttribute('rel', 'noreferrer');
    expect(links[3]).toHaveAttribute('target', '_blank');
  });
});
