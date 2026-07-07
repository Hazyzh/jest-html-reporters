import React from 'react';

import { DashBoard } from '@/components/DashBoard';
import { render, screen } from '@testing-library/react';

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
    };
    render(<DashBoard {...mockProps} />);
    const myCardItems = screen.getAllByTestId('MyCardItem');
    expect(myCardItems.length).toEqual(7);
  });

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
    };
    render(<DashBoard {...mockProps} />);
    const myCardItems = screen.getAllByTestId('MyCardItem');
    expect(myCardItems.length).toEqual(6);
  });

  test('pending counts should be labeled as skipped counts', () => {
    const mockProps = {
      numTotalTests: 3,
      numTotalTestSuites: 3,
      numFailedTestSuites: 0,
      numFailedTests: 0,
      numPendingTestSuites: 1,
      numPendingTests: 1,
      numRuntimeErrorTestSuites: 0,
      testResults: [],
    };
    render(<DashBoard {...mockProps} />);
    expect(screen.getByText('Skipped Suites')).toBeInTheDocument();
    expect(screen.getByText('Skipped Tests')).toBeInTheDocument();
    expect(screen.queryByText('Pending Suites')).not.toBeInTheDocument();
    expect(screen.queryByText('Pending Tests')).not.toBeInTheDocument();
  });
});
