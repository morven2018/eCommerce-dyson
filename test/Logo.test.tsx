import { render, screen } from '@testing-library/react';
import Logo from '../src/components/layout/rsschool/Logo';
import { describe, it, expect } from 'vitest';

describe('Logo Component', () => {
  it('renders correctly', () => {
    render(<Logo />);

    // Проверяем заголовок
    expect(screen.getByText('Our Collaboration')).toBeInTheDocument();

    // Проверяем описание коллаборации
    expect(
      screen.getByText(
        /Before each sprint, our team defined and assigned core tasks/i
      )
    ).toBeInTheDocument();

    // Проверяем текст о проекте
    expect(
      screen.getByText(
        /This project was developed as the final assignment of the Frontend/i
      )
    ).toBeInTheDocument();

    // Проверяем наличие разделителя (если важно)
    expect(screen.getByRole('separator')).toBeInTheDocument();

    // Проверяем ссылку и логотип RS School
    const logoLink = screen.getByRole('link', { name: /Rsschool Logo/i });
    expect(logoLink).toHaveAttribute('href', 'https://rs.school/');
    expect(logoLink).toHaveAttribute('target', '_blank');
    expect(logoLink).toHaveAttribute('rel', 'noopener noreferrer');

    const logoImage = screen.getByRole('img', { name: /Rsschool Logo/i });
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src'); // Можно уточнить путь, если нужно
  });
});
