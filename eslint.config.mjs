import js from '@eslint/js';
import globals from 'globals';
import json from '@eslint/json';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  { ignores: ['package-lock.json'] },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'warn',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'error',
    },
  },
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },

  prettierConfig,
]);
