const presets = [
  ['@babel/env', {
    targets: {
      edge: '17',
      firefox: '60',
      chrome: '67',
      safari: '11.1'
    },
    useBuiltIns: 'usage'
  }],
  '@babel/react'
]

const plugins = [
  ['import-separation', { 'libraryName': 'antd', 'style': true }],
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-transform-runtime',
  'react-hot-loader/babel',
]

module.exports = { presets, plugins }
