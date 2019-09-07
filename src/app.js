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
window.realData = data.testResult
document.title = data.config.pageTitle || ''
console.log(data)
const getInitData = ({ testResults = [] }) => testResults.reduce((pre, item) => {
  pre[item.testFilePath] = false
  return pre
}, {})

const { Header, Content, Footer } = Layout
class App extends Component {
  constructor(props) {
    super(props)
    console.log(data)
    this.state = {
      expand: getInitData(data),
      toggleExpand: this.toggleExpand
    }
  }

  toggleExpand = ({ key, state }) => {
    this.setState(({ expand }) => ({ expand: { ...expand, [key]: state } }))
  }

  render() {
    const { hideIcon, pageTitle } = data.config
    const IconComp = hideIcon ? null : <a target='_blank' className='icon' href='https://github.com/Hazyzh/jest-html-reporter'><Icon type='github' theme='filled' /></a>
    return (
      <Provider value={this.state}>
        <Layout className='layout'>
          <Header className='header'>
            <span>{pageTitle}</span>
            {IconComp}
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
