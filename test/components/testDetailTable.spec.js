import React from 'react'
import { Table } from 'antd'
import DetailTable from '@/components/DetailTable'
import ErrorButton from '@/components/ErrorButton'

import { mount } from 'enzyme'

describe('test DetailTable ', () => {
  test('should return antd table component', () => {
    const wrapper = mount(<DetailTable />)
    expect(wrapper.find(Table)).toExist()
  })

  test('if there had failed item, should had a error button item', () => {
    const mockProps = {
      data: [
        { failureMessages: 'failed' }
      ]
    }
    const wrapper = mount(<DetailTable {...mockProps} />)
    expect(wrapper.find(ErrorButton)).toExist()
  })
})
