import React from 'react'
import Information, { SimpleBarChart } from '@/components/Information'
import { PieChart, BarChart } from 'recharts'
import { mount } from 'enzyme'
import '../__mocks__/matchMedia.mock';
import moment from 'moment';

const mockProps = {
  config: {
    rootDir: '/root/dir/name',
    maxWorkers: 7
  },
  startTime: '1538200731831',
  endTime: '1538200734761',
  testResults: [],
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

  test('main information area shoule container stuff informations', () => {
    // start time (will differ due to timezone)
    expect(wrapper.find('div.main_information')).toIncludeText(moment(parseInt(mockProps.startTime, 10)).format('YYYY-MM-DD HH:mm:ss'))
    // time
    expect(wrapper.find('div.main_information')).toIncludeText('00:02.930')
    // root dir
    expect(wrapper.find('div.main_information')).toIncludeText('/root/dir/name')
    // max worker
    expect(wrapper.find('div.main_information')).toIncludeText(7)
  })
})
