import React from 'react'
import Information, { SimpleBarChart } from '@/components/Information'
import { PieChart, BarChart } from 'recharts'
import { mount } from 'enzyme'
import '../__mocks__/matchMedia.mock';

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

describe('test Information component', () => {
  const wrapper = mount(<Information {...mockProps} />)
  test('there should have a main information area to display main information', () => {
    expect(wrapper.find('div.main_information')).toExist()
  })

  test('there should have a main BarChart area to display bar chart', () => {
    expect(wrapper.find(SimpleBarChart)).toExist()
    expect(wrapper.find(BarChart)).toExist()
  })

  test('there should have a main PieChart area to display pie chart', () => {
    expect(wrapper.find(PieChart)).toExist()
  })

  test('main information area should contain run information', () => {
    // start time (will differ due to timezone)
    expect(wrapper.find('div.main_information')).toContainMatchingElement('.StartTime')

    // time
    expect(wrapper.find('div.main_information')).toContainMatchingElement('.Time')
    expect(wrapper.find('div.main_information .Time .label_value').text()).toBe('00:02.930')

    // root dir
    expect(wrapper.find('div.main_information')).toContainMatchingElement('.RootDir')
    expect(wrapper.find('div.main_information .RootDir .label_value').text()).toBe('/root/dir/name')

    // max workers
    expect(wrapper.find('div.main_information')).toContainMatchingElement('.MaxWorkers')
    expect(wrapper.find('div.main_information .MaxWorkers .label_value').text()).toBe('7')
  })

  test('main information area should contain custom information', () => {
    expect(wrapper.find('div.main_information')).toContainMatchingElement('.CustomInfo')
  })

  test('main information area should not contain custom information', () => {
    const wrapper = mount(<Information {... {
      config: {
        rootDir: '/root/dir/name',
        maxWorkers: 7
      },
      startTime: '1538200731831',
      endTime: '1538200734761',
      testResults: [],
    }} />)
    expect(wrapper.find('div.main_information')).not.toContainMatchingElement('.CustomInfo')
  })
})
