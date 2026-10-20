import eslint from '@eslint/js';
import astro from 'eslint-plugin-astro';
import { defineConfig } from 'eslint/config';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: [
      'dist/**',
      '.astro/**',
      'node_modules/**',
      'coverage/**',
      'test-results/**',
      'playwright-report/**',
      '.lighthouseci/**',
      'public/**',
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),
  astro.configs['flat/recommended'],
  astro.configs['flat/jsx-a11y-recommended'],
  {
    files: ['**/*.{tsx,jsx}'],
    ...jsxA11y.configs.recommended,
  },
);
