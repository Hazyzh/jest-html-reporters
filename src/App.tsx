import 'normalize.css';

import './styles/index.scss';
import './styles/dashBoard.scss';
import './styles/information.scss';
import './styles/errorButton.scss';

import { Layout, ConfigProvider, theme } from 'antd';
import type { IReportData } from './interfaces/ReportData.interface';

import { ExpandContext } from './contexts/expand';
import { ThemeToken, ComponentsToken } from './theme';
import { Header, Footer } from './components';
import { useProviderValue } from './lib/expand';

import { HomePage } from './pages/HomePage';
import { useState } from 'react';

const App = ({ data }: { data: IReportData }) => {
  const providerValue = useProviderValue(data);
  const [darkTheme, setDarkTheme] = useState(!!data._reporterOptions.darkTheme);

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
