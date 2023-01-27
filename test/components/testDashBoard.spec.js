import '../__mocks__/matchMedia.mock';

import React from 'react';

import DashBoard from '@/components/DashBoard';
import {
  render,
  screen,
} from '@testing-library/react';

describe('test Dashboard item number', () => {
  test('if there have all type test there should has 7 MyCardItem items', () => {
    const mockProps = {
      numTotalTests: 3,
      numTotalTestSuites: 3,
      numFailedTestSuites: 1,
      numFailedTests: 1,
      numPendingTestSuites: 1,
      numPendingTests: 1,
      numRuntimeErrorTestSuites: 1,
      testResults: [],
    }
    render(<DashBoard {...mockProps} />)
    const myCardItems = screen.getAllByTestId('MyCardItem')
    expect(myCardItems.length).toEqual(7)
  })

  test('if there not have numRuntimeErrorTestSuites test there should has 6 MyCardItem items', () => {
    const mockProps = {
      numTotalTests: 3,
      numTotalTestSuites: 3,
      numFailedTestSuites: 1,
      numFailedTests: 1,
      numPendingTestSuites: 1,
      numPendingTests: 1,
      numRuntimeErrorTestSuites: 0,
      testResults: [],
    }
    render(<DashBoard {...mockProps} />)
    const myCardItems = screen.getAllByTestId('MyCardItem')
    expect(myCardItems.length).toEqual(6)
  })
})
