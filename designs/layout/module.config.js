const deps = require('./package.json').dependencies;

module.exports = {
  name: 'layout',
  library: { type: 'var', name: 'layout' },
  filename: 'remoteEntry.js',
  exposes: {
    // expose each component
    './dist/components/EditorLayout': './src/components/EditorLayout',
  },
  shared: {
    '@jtoolkit/shared': { singleton: true, requiredVersion: deps['@jtoolkit/shared'] },
    react: { singleton: true, requiredVersion: deps.react },
    'react-dom': {
      singleton: true,
      requiredVersion: deps['react-dom'],
    },
  },
};
