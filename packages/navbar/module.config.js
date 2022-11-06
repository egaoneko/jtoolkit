const deps = require('./package.json').dependencies;

module.exports = {
  name: 'navbar',
  library: { type: 'var', name: 'navbar' },
  filename: 'remoteEntry.js',
  exposes: {
    // expose each component
    './dist/components/VerticalNavbar': './src/components/VerticalNavbar',
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
