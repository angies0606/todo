const {alias} = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@components': 'src/components',
    '@features': 'src/features',
    '@ui-kit': 'src/ui-kit',
    '@dialogs': 'src/dialogs',
    '@store': 'src/store',
    '@api': 'src/api'
  })(config);

  return config;
};