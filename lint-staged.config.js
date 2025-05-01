module.exports = {
  'src/**/*.{ts,tsx}': [
    () => 'tsc --noEmit',
    'eslint --fix',
    'prettier --write',
  ],
};
