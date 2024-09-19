module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: ['next/core-web-vitals', 'next/typescript', 'plugin:prettier/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: [],
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
    'prettier/prettier': 'warn',
    'no-empty-pattern': 'off'
  }
}
