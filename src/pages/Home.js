import React, { Component } from 'react'
import data from '../testdata.json'
console.log(data)

class HomePage extends Component {
  state = {
    ...data
  }
  render () {
    return (
      <h1>hello name</h1>
    )
  }
}

export default HomePage
