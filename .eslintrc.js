module.exports = {
  "env": {
    "node": true,
    "es6": true,
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": 'module',
    "ecmaFeatures": {
      'jsx': true,
    },
  },
  'plugins': [
    'react-hooks',
  ],
  rules: {
    semi: 'off',
    'no-console': 'off',
    'react/jsx-filename-extension': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
