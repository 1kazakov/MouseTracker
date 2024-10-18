module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxt/eslint-config', 'plugin:prettier/recommended', 'prettier'],
  plugins: ['nuxt'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleAttributePerLine: true,
        htmlWhitespaceSensitivity: 'ignore',
        endOfLine: 'auto',
      },
    ],
    'no-console': ['warn', { allow: ['error'] }],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false,
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/no-multiple-template-root': 'off',
    'vuejs-accessibility/label-has-for': [
      'warn',
      {
        components: ['Label'],
        required: {
          every: ['nesting', 'id'],
        },
        allowChildren: true,
      },
    ],
  },
  overrides: [
    {
      files: ['pages/**/*.vue'],
      rules: {
        'vue/component-name-in-template-casing': 'off',
      },
    },
  ],
};
