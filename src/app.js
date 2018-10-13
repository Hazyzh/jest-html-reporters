import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Layout } from 'antd'
import HomePage from './pages/Home'
import FooterInfo from './components/FooterInfo'
import './styles/app.less'
import './styles/index.less'
import './styles/dashBoard.less'
import './styles/information.less'
import './styles/footer.less'

// context
import { Provider } from './contexts/expand'

const { Header, Content, Footer } = Layout
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expand: [],
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
          <Header className='header' />
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
