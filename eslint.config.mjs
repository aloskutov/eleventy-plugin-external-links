import {defineConfig, globalIgnores} from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['**/*.config.js']),
  {
    extends: compat.extends('eslint:recommended'),

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },

    rules: {
      camelcase: ['error'],
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],

      'max-len': [
        'error',
        {
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],

      'no-confusing-arrow': ['error'],
      'no-duplicate-imports': ['error'],
      'no-self-compare': ['error'],
      'no-return-await': ['error'],
      'no-use-before-define': ['error'],
      'no-unused-vars': ['error'],

      quotes: [
        'error',
        'single',
        {
          allowTemplateLiterals: true,
        },
      ],

      semi: ['error', 'always'],
      strict: 'warn',
    },
  },
]);
