import 'normalize.css';

import './styles/app.less';
import './styles/index.less';
import './styles/dashBoard.less';
import './styles/information.less';
import './styles/errorButton.less';

import React from 'react';
import { Layout, ConfigProvider, theme } from 'antd';
import type { IReportData } from './interfaces/ReportData.interface';

import { ExpandContext } from './contexts/expand';
import { ThemeToken, ComponentsToken } from './theme';
import { Header, Footer } from './components';
import { getProviderValue } from './lib/expand';

import { HomePage } from './pages/HomePage';
import { useState } from 'react';

const App = ({ data }: { data: IReportData }) => {
  const providerValue = getProviderValue(data);
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <ConfigProvider
      theme={{
        algorithm:  darkTheme ? theme.darkAlgorithm : undefined,
        token: ThemeToken,
        components: ComponentsToken,
      }}
    >
      <ExpandContext.Provider value={providerValue}>
        <Layout>
          <Header data={data} darkTheme={darkTheme} toggleDarkTheme={setDarkTheme}/>
          <HomePage data={data}/>
          <Footer />
        </Layout>
      </ExpandContext.Provider>
    </ConfigProvider>
  );
};

export default App;
