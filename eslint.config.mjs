import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = [
  // Ignore build and config files
  {
    ignores: [
      '.next/**/*',
      'node_modules/**/*',
      'coverage/**/*',
      'out/**/*',
      'build/**/*',
      'dist/**/*',
      '*.config.js',
      '*.config.ts',
    ],
  },
  // Apply rules only to source files
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['app/**/*.{js,jsx,ts,tsx}', 'pages/**/*.{js,jsx,ts,tsx}', 'src/**/*.{js,jsx,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': false,
          'ts-nocheck': false,
          'ts-check': false,
        },
      ],
      '@next/next/no-assign-module-variable': 'off',
    },
  },
];

export default config;
