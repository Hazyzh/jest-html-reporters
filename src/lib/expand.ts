import { useState, useMemo } from 'react';

const getInitData = ({ testResults = [] }: { testResults: any[] }) =>
  testResults.reduce((pre, item) => {
    pre[item.testFilePath] = false;
    return pre;
  }, {});

export const useProviderValue = (data: any) => {
  const [expand, setExpand] = useState(getInitData(data));

  const providerValue = useMemo(
    () => ({
      expand,
      toggleExpand: ({ key, state }: { key: string; state: boolean }) => {
        setExpand({ ...expand, [key]: state });
      },
    }),
    [expand]
  );
  return providerValue;
};
