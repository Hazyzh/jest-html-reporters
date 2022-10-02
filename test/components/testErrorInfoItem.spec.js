import React from 'react';

import ErrorInfoItem from '@/components/ErrorInfoItem';
import {
  render,
  screen,
} from '@testing-library/react';

describe('test Dashboard item number', () => {
  test('if no data will return null', () => {
    const mockProps = {
      data: ''
    }
    render(<ErrorInfoItem {...mockProps} />)
    expect(screen.queryByTestId('ErrorInfoItem')).not.toBeInTheDocument();
  })

  test('if has data will return pre', () => {
    const mockProps = {
      data: 'some text'
    }
    const wrapper = render(<ErrorInfoItem {...mockProps} />)
    expect(screen.queryByTestId('ErrorInfoItem')).toBeInTheDocument();
  })
})
