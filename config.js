SystemJS.config({
  baseURL: './',
  transpiler: 'plugin-babel',
  defaultExtension: true,
  packages: {
    '.': {
      main: './app.js',
      defaultExtension: 'js'
    }
  },
  map: {
    'plugin-babel': 'https://cdn.jsdelivr.net/npm/systemjs-plugin-babel@0.0.25/plugin-babel.js',
    'systemjs-babel-build': 'https://cdn.jsdelivr.net/npm/systemjs-plugin-babel@0.0.25/systemjs-babel-browser.js',
    'react': 'https://unpkg.com/react@17.0.1/umd/react.development.js',
    'react-dom': 'https://unpkg.com/react-dom@17.0.1/umd/react-dom.development.js'
  },
  meta: {
    '*.js': {
      babelOptions: {
        react: true
      }
    }
  }
});
