module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  root: true,
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-shadow': ['off'],
    'no-underscore-dangle': ['off'],
    'no-plusplus': ['off'],
    'no-param-reassign': ['off'],
    'prefer-destructuring': ['off'],
    'max-len': [
      'error',
      160,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-use-before-define': ['error', { functions: false, classes: true }],
    'no-empty': 'off',
    'global-require': 'off',
    'consistent-return': 'off',
    'no-continue': 'off',
    'no-console': 'off',
    'no-await-in-loop': 'off',
    radix: 'off',
    'no-nested-ternary': 'off',
    'object-curly-newline': 'off',
    'no-throw-literal': 'off',
    'import/no-unresolved': ['error', { ignore: ['^#.*'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        '': 'never',
      },
    ],
    'no-promise-executor-return': 'off',
    'no-template-curly-in-string': 'off',
  },
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020,
  },
};
