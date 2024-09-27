module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: ['next/core-web-vitals', 'next/typescript', 'plugin:prettier/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: ['simple-import-sort'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'warn'
      }
    }
  ],
  rules: {
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          [
            // Node.js builtins.
            `^node:`,
            `^(${require('module').builtinModules.join('|')})(/|$)`,
            // Packages.
            '^@?\\w',
            // Internal packages.
            '^lib(/.*|$)',
            '^src(/.*|$)',
            // Parent imports. Put `..` last.
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            // Other relative imports. Put same-folder imports and `.` last.
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$'
          ]
        ]
      }
    ],
    'prettier/prettier': 'warn',
    'no-empty-pattern': 'off'
  }
}
