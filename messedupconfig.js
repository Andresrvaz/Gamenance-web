const { FlatCompat } = require('@eslint/eslintrc');

// Instantiate FlatCompat
const compat = new FlatCompat();

/** @type {import('@eslint/eslintrc').FlatConfig} */
const config = {
  // Global settings
  compat.env({
    node: true,
    es6: true,
  }),

  // Language options
  {
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './server/tsconfig.json', // Ensure this path is correct
        sourceType: 'module',
      },
      globals: {
        // Define any global variables you need here
      },
    },
  },

  // Plugins
  {
    plugins: ['@typescript-eslint'],
  },

  // Extends
  'eslint:recommended',
  'plugin:@typescript-eslint/recommended',
  'prettier',

  // Rules
  {
    rules: {
      'no-plusplus': [
        'error',
        {
          allowForLoopAfterthoughts: true,
        },
      ],
      // Add any additional rules or overrides as needed
    },
  },
};

module.exports = config;