import React from 'react'
import ErrorInfoItem from '@/components/ErrorInfoItem'
import { mount } from 'enzyme'

describe('test Dashboard item number', () => {
  test('if no data will return null', () => {
    const mockProps = {
      data: ''
    }
    const wrapper = mount(<ErrorInfoItem {...mockProps} />)
    expect(wrapper).toBeEmptyRender()
  })

  test('if has data will return pre', () => {
    const mockProps = {
      data: 'some text'
    }
    const wrapper = mount(<ErrorInfoItem {...mockProps} />)
    expect(wrapper.find('pre')).toExist()
  })
})
