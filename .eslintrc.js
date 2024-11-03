module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'wdio', 'mocha'],
  extends: ['eslint:recommended', 'plugin:wdio/recommended'],
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  rules: {
    'mocha/no-exclusive-tests': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: 'directive', next: '*' },
    ],
    'lines-between-class-members': ['error', 'always'],
    'max-len': [2, { code: 140, tabWidth: 2, ignoreUrls: true, ignorePattern: '^import .*' }],
    'no-duplicate-imports': ['error', { includeExports: true }], // disallow duplicate module imports
    curly: ['error', 'all'], // enforce consistent brace style for all control statements
    eqeqeq: 'error', // equire the use of === and !==
    'no-lone-blocks': 'error', // disallow unnecessary nested blocks
    'no-multi-spaces': 'error', // disallow multiple spaces
    'no-new': 'error', // disallow new operators outside of assignments or comparisons
    'no-new-func': 'error', // disallow new operators with the Function object
    'no-new-wrappers': 'error', // disallow new operators with the String, Number, and Boolean objects
    'no-return-await': 'error', // disallow unnecessary return await
    'no-self-compare': 'error', // disallow comparisons where both sides are exactly the same
    'no-sequences': 'error', // disallow comma operators
    'no-throw-literal': 'error', // disallow throwing literals as exceptions
    'no-unused-expressions': 'error', // disallow unused expressions
    'no-useless-call': 'error', // disallow unnecessary calls to .call() and .apply()
    'no-useless-concat': 'error', // disallow unnecessary concatenation of literals or template literals
    'no-useless-return': 'error', // disallow redundant return statements
    'prefer-promise-reject-errors': 'error', // require using Error objects as Promise rejection reasons
    radix: 'error', // enforce the consistent use of the radix argument when using parseInt()
    'comma-style': 'error', // enforce consistent comma style
    'eol-last': 'error', // require or disallow newline at the end of files
    'key-spacing': 'error', // enforce consistent spacing between keys and values in object literal properties
    'keyword-spacing': 'error', // enforce consistent spacing before and after keywords
    'new-parens': 'error', // enforce or disallow parentheses when invoking a constructor with no arguments
    'no-bitwise': 'warn', // disallow bitwise operators
    'no-multiple-empty-lines': 'error', // disallow multiple empty lines
    'no-nested-ternary': 'error', // disallow nested ternary expressions
    'no-new-object': 'error', // disallow Object constructors
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'no-trailing-spaces': 'error', // disallow trailing whitespace at the end of lines
    'object-curly-newline': 'error', // enforce consistent line breaks inside braces
    'object-curly-spacing': ['error', 'always'], // enforce consistent spacing inside braces
    'semi-spacing': 'error', // enforce consistent spacing before and after semicolons
    'space-before-blocks': 'error', // enforce consistent spacing before blocks
    'space-in-parens': 'error', // enforce consistent spacing inside parentheses
    'space-infix-ops': 'error', // require spacing around infix operators
    'space-unary-ops': 'error', // enforce consistent spacing before or after unary operators
    'spaced-comment': ['error', 'always', { exceptions: ['*'] }], // enforce consistent spacing after the // or /* in a comment
    'switch-colon-spacing': 'error', // enforce spacing around colons of switch statements
    'arrow-spacing': 'error', // enforce consistent spacing before and after the arrow in arrow functions
    'generator-star-spacing': ['error', 'after'], // enforce consistent spacing around * operators in generator functions
    'prefer-arrow-callback': 'warn', // require using arrow functions for callbacks
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: false,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
    ],
    'rest-spread-spacing': ['error', 'never'], // enforce spacing between rest and spread operators and their expressions
    'quote-props': ['error', 'as-needed'], // disallows quotes around object literal property names that are not strictly required
    'wdio/no-pause': 0,
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/semi': ['error', 'always'], // Require or disallow semicolons instead of ASI
    '@typescript-eslint/no-magic-numbers': 'off', // Disallows magic numbers
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
    '@typescript-eslint/brace-style': ['error', '1tbs'], // Enforce consistent brace style for blocks
    '@typescript-eslint/quotes': [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    '@typescript-eslint/no-inferrable-types': 'off', // disallows explicit type declarations on parameters, variables and properties where the type can be easily inferred from its value.
    '@typescript-eslint/no-parameter-properties': 'off', // Disallow the use of parameter properties in class constructors
    '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }], // This rule aims to ensure that the values returned from functions are of the expected type
    '@typescript-eslint/restrict-plus-operands': 'off', // When adding two variables, operands must both be of type number or of type string
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'generic',
        readonly: 'generic',
      },
    ], // This rule aims to standardise usage of array types within your codebase
    '@typescript-eslint/no-explicit-any': 'off', // Disallow usage of the any type
    '@typescript-eslint/explicit-member-accessibility': [
      'warn',
      {
        accessibility: 'explicit',
        overrides: {
          constructors: 'no-public',
        },
      },
    ], // Require explicit accessibility modifiers on class properties and methods
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false }], // Disallow the use of variables before they are defined
  },
  overrides: [
    {
      files: ['.eslintrc.js', 'config/**', '**/*.spec.ts'],
      rules: {
        'max-len': [2, { code: 400, tabWidth: 4 }],
      },
    },
    {
      files: ['*.ts'],
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
      },
    },
    {
      files: ['*.spec.ts'],
      rules: {
        'prefer-arrow-callback': 'off', // require using arrow functions for callbacks
      },
    },
    {
      files: ['*.skip.ts'],
      rules: {
        'prefer-arrow-callback': 'off', // require using arrow functions for callbacks
      },
    },
  ],
};
