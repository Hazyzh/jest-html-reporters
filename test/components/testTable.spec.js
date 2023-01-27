import '../__mocks__/matchMedia.mock';

import React from 'react';

import Table from '@/components/Table';
import {
  render,
  screen,
} from '@testing-library/react';

const mockProps = {
  testResults: [],
  config: {
    rootDir: '/root/dir',
  },
  _reporterOptions: {
    testCommand: 'npx test',
  },
};

describe('test table ', () => {
  test('should return antd table component', () => {
    render(<Table {...mockProps} />);
    expect(screen.queryByTestId('tableBox')).toBeInTheDocument();
  });
});
