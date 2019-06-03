import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Layout, Icon } from 'antd'
import HomePage from './pages/Home'
import FooterInfo from './components/FooterInfo'
import './styles/app.less'
import './styles/index.less'
import './styles/dashBoard.less'
import './styles/information.less'
import './styles/footer.less'

// context
import { Provider } from './contexts/expand'

let data
if (process.env.NODE_ENV === 'production') {
  data = JSON.parse(window.resData)
} else {
  data = require('./devMock.json')
}
window.realData = data

const getInitData = ({ testResults = [] }) => testResults.reduce((pre, item) => {
  pre[item.testFilePath] = false
  return pre
}, {})

const { Header, Content, Footer } = Layout
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expand: getInitData(data),
      toggleExpand: this.toggleExpand,
    }
  }

  toggleExpand = ({ key, state }) => {
    this.setState(({ expand }) => ({ expand: { ...expand, [key]: state } }))
  }

  render () {
    return (
      <Provider value={this.state}>
        <Layout className='layout'>
          <Header className='header'>
            <a target='_blank' href='https://github.com/Hazyzh/jest-html-reporters'>
              <Icon type='github' theme='filled' />
            </a>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <HomePage />
          </Content>
          <Footer style={{ marginTop: '50px', background: '#000' }}>
            <FooterInfo />
          </Footer>
        </Layout>
      </Provider>
    )
  }
}

export default hot(module)(App)
