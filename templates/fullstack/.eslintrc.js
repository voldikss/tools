module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2016,
  },
  env: {
    node: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'],
  plugins: ['prettier', 'simple-import-sort'],
  rules: {
    'prefer-const': ['error', { ignoreReadBeforeAssign: true, destructuring: 'all' }],
    'no-case-declarations': 'off',
    'no-prototype-builtins': 'off',
    'no-control-regex': 'off',
    'prettier/prettier': [1, require('./.prettierrc.js')],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',

    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/unbound-method': [
      'off',
      {
        ignoreStatic: true,
      },
    ],
    '@typescript-eslint/no-namespace': ['off'],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Object: {
            message: 'Use {} instead.',
          },
          String: {
            message: "Use 'string' instead.",
            fixWith: 'string',
          },
          Number: {
            message: "Use 'number' instead.",
            fixWith: 'number',
          },
          Boolean: {
            message: "Use 'boolean' instead.",
            fixWith: 'boolean',
          },
          '{}': false,
        },
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^(I|Interface)[A-Z]',
          match: false,
        },
      },
    ],
  },
}
