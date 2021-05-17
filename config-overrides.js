const {alias} = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@components': 'src/components',
    '@ui-kit': 'src/ui-kit',
    '@dialogs': 'src/dialogs',
    '@store': 'src/store'
  })(config);

  return config;
};