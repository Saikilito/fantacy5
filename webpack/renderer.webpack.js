// const webpack = require('webpack')
module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: require('./rules.webpack'),
  },
}
