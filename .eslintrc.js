module.exports = {
    plugins: ['testing-library'],
    extends: ['plugin:testing-library/react'],
    rules: {
      'testing-library/no-unnecessary-act': 'error',
    },
    overrides: [
      {
        files: ['**/*.test.js', '**/*.test.ts', '**/*.spec.js', '**/*.spec.ts'],
        rules: {
          'testing-library/no-unnecessary-act': 'error',
        },
      },
    ],
  };
  