import '../__mocks__/matchMedia.mock';

import React from 'react';

import Information from '@/components/Information';
import { render } from '@testing-library/react';

const mockProps = {
  config: {
    rootDir: '/root/dir/name',
    maxWorkers: 7
  },
  startTime: '1538200731831',
  endTime: '1538200734761',
  testResults: [],
  customInfos: [{title: "abc", value: "123"}]
}

class ResizeObserver {
  observe() {
      // do nothing
  }
  unobserve() {
      // do nothing
  }
  disconnect() {
      // do nothing
  }
}
window.ResizeObserver = ResizeObserver;

let wrapper;
beforeEach(() => {
  wrapper = render(<Information {...mockProps} />).container
})

describe('test Information component', () => {
  test('there should have a main information area to display main information', () => {
    expect(wrapper.getElementsByClassName('main_information').length).toBe(1)
  })
})
