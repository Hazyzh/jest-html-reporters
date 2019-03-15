import React from 'react'
import { Table as AntTabel } from 'antd'
import Table from '@/components/Table'

import { mount } from 'enzyme'

const mockProps = {
  testResults: [],
  config: {
    rootDir: '/root/dir' 
  } 
}

describe('test table ', () => {
  test('should return antd table component', () => {
    const wrapper = mount(<Table {...mockProps} />)
    expect(wrapper.find(AntTabel)).toExist()
  })
})
