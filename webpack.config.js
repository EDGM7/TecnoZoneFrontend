const nodeExternals = require('webpack-node-externals');
const cryptoFallback = require.resolve('crypto-browserify');

module.exports = {
  // Otras configuraciones de webpack...
  externals: [
    nodeExternals(),
  ],
  resolve: {
    fallback: {
      "crypto": cryptoFallback
    }
  },
  // Otras configuraciones de webpack...
};
