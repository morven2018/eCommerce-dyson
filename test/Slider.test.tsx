import { render, screen, fireEvent } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import { Slider } from '../src/components/layout/product/slider/Slider';
import '@testing-library/jest-dom';

vi.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper">{children}</div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper-slide">{children}</div>
  ),
}));

vi.mock('swiper/css', () => ({}));

describe('Slider', () => {
  const defaultProps = {
    images: [
      { src: 'image1.jpg', alt: 'Image 1' },
      { src: 'image2.jpg', alt: 'Image 2' },
      { src: 'image3.jpg', alt: 'Image 3' },
    ],
  };

  it('renders Swiper with correct number of slides', () => {
    render(<Slider {...defaultProps} />);

    const slides = screen.getAllByTestId('swiper-slide');
    expect(slides).toHaveLength(defaultProps.images.length);
    expect(screen.getByTestId('swiper')).toBeInTheDocument();
  });

  it('renders images with correct src and alt attributes', () => {
    render(<Slider {...defaultProps} />);

    defaultProps.images.forEach((image) => {
      const img = screen.getByAltText(image.alt);
      expect(img).toHaveAttribute('src', image.src);
    });
  });

  it('opens modal with correct image when an image is clicked', () => {
    render(<Slider {...defaultProps} />);

    const firstImage = screen.getByAltText('Image 1');
    fireEvent.click(firstImage);
  });

  it('closes modal when close button is clicked', () => {
    render(<Slider {...defaultProps} />);

    fireEvent.click(screen.getByAltText('Image 1'));
    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);
    expect(screen.queryByTestId('modal-window')).not.toBeInTheDocument();
  });

  it('navigates to next image when next button is clicked', () => {
    render(<Slider {...defaultProps} />);

    fireEvent.click(screen.getByAltText('Image 1'));
    const nextButton = screen.getByText('⭢');
    fireEvent.click(nextButton);
  });

  it('navigates to previous image when previous button is clicked', () => {
    render(<Slider {...defaultProps} />);

    fireEvent.click(screen.getByAltText('Image 1'));
    const prevButton = screen.getByText('⭠');
    fireEvent.click(prevButton);
  });

  it('disables navigation buttons when only one image is provided', () => {
    const singleImageProps = {
      images: [{ src: 'single.jpg', alt: 'Single Image' }],
    };
    render(<Slider {...singleImageProps} />);

    fireEvent.click(screen.getByAltText('Single Image'));
    const prevButton = screen.getByText('⭠');
    const nextButton = screen.getByText('⭢');

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });
});
