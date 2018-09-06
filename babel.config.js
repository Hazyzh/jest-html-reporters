
const plugins = [
  ['import-separation', { 'libraryName': 'antd', 'style': true }],
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-transform-runtime',
  'react-hot-loader/babel',
]

module.exports = function(api) {
  const envOptions = {
    useBuiltIns: 'usage'
  }
  if (api.env('production')) {
    envOptions.targets = {
      edge: '17',
      firefox: '60',
      chrome: '67',
      safari: '11.1'
    }
  }
  const presets = [
    ['@babel/env', {
      ...envOptions
    }],
    '@babel/react'
  ]

  return { presets, plugins }
}
