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

const { Header, Content, Footer } = Layout
class App extends Component {
  render () {
    return (
      <Layout className='layout'>
        <Header className='header' />
        <Content style={{ padding: '0 50px' }}>
          <HomePage />
        </Content>
        <Footer style={{ marginTop: '50px', background: '#000' }}>
          <FooterInfo />
        </Footer>
      </Layout>
    )
  }
}

export default hot(module)(App)
