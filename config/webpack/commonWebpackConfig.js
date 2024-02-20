const { generateWebpackConfig, merge } = require('shakapacker')

const aliasConfig = require('./alias.js')

const baseClientWebpackConfig = generateWebpackConfig()

const commonOptions = {
  resolve: {
    extensions: ['.css', '.ts', '.tsx'],
    fallback: {
      buffer: require.resolve('buffer/')
    }
  }
}

// Copy the object using merge b/c the baseClientWebpackConfig and commonOptions are mutable globals
const commonWebpackConfig = () =>
  merge({}, baseClientWebpackConfig, commonOptions, aliasConfig)

module.exports = commonWebpackConfig
