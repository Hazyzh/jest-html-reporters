import React from 'react';

import { ErrorButton } from '@/components/ErrorButton';
import { render, screen } from '@testing-library/react';

describe('test error button component', () => {
  test('button should render when there has failureMessage', () => {
    const props = {
      failureMessage: 'failure message',
    };
    render(<ErrorButton {...props} />);
    expect(screen.queryByTestId('ErrorButton')).toBeInTheDocument();
  });
  test('button should not render when there not has failureMessage', () => {
    const props = {
      failureMessage: '',
    };
    render(<ErrorButton {...props} />);
    expect(screen.queryByTestId('ErrorButton')).not.toBeInTheDocument();
  });
});
