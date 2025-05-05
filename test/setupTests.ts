import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup(); // Очищаем DOM
  vi.clearAllMocks(); // Сбрасываем все моки
});
