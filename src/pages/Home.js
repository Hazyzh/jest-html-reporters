import React, { Component } from 'react'
import data from '../testdata.json'
import TableItem from '../components/Table'
console.log(data.testResults)

class HomePage extends Component {
  state = {
    ...data
  }
  render () {
    const { testResults } = this.state
    return (
      <div>
        <TableItem data={testResults} />
      </div>
    )
  }
}

export default HomePage
