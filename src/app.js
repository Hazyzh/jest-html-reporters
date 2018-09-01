import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Button } from 'antd'

class App extends Component {
  render () {
    return (
      <h1>hello app !<Button>click</Button></h1>
    )
  }
}

export default hot(module)(App)
