import '../__mocks__/matchMedia.mock';

import React from 'react';

import { mount } from 'enzyme';
import fs from 'fs';

import DashBoard, { MyCardItem } from '@/components/DashBoard';

import { addAttach } from '../../helper';

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
    const wrapper = mount(<DashBoard {...mockProps} />)
    const myCardItems = wrapper.find(MyCardItem)
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
    const wrapper = mount(<DashBoard {...mockProps} />)
    const myCardItems = wrapper.find(MyCardItem)
    expect(myCardItems.length).toEqual(6)
  })

  test('2323', async () => {
    console.log(process.ppid);
    const data = fs.readFileSync('./html-report/hah.jpeg');
    await addAttach({attach: data, description: 'hellop'})
    expect(6).toEqual(6)
  })
})
