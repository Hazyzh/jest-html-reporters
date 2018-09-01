import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import HomePage from './pages/Home'

class App extends Component {
  render () {
    return (
      <HomePage />
    )
  }
}

export default hot(module)(App)
