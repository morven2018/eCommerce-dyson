import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Разрешает использование глобальных переменных (например, describe, it)
    environment: 'jsdom', // Устанавливает среду выполнения тестов (для React нужен jsdom)
    setupFiles: './test/setupTests', // Файл для настройки тестов (опционально)
    coverage: {
      provider: 'v8', // Используем v8 для анализа покрытия кода
      reporter: ['text', 'html'], // Формат отчетов
      thresholds: {
        lines: 25, // Минимальный процент покрытия строк
        functions: 25, // Минимальный процент покрытия функций
        branches: 25, // Минимальный процент покрытия веток
        statements: 25, // Минимальный процент покрытия операторов
      },
    },
  },
});
