module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': 'off'
  },
  globals: {
    window: true,
    FosterPals: true,
      Backbone: true,
    CURRENT_USER_ID: true,
    JST: true,
    $: true,
    _: true,
    jQuery: true,
    google: true,
    cloudinary: true,
    CLOUDINARY_OPTIONS: true,
    toastr: true
  }
};
