import '../__mocks__/matchMedia.mock';

import React from 'react';

import { MainTable } from '@/components/MainTable';
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
    render(<MainTable {...mockProps} />);
    expect(screen.queryByTestId('tableBox')).toBeInTheDocument();
  });
});
