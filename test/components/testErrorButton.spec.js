import React from 'react'
import { Modal } from 'antd'
import { mount, shallow } from 'enzyme'
import ErrorButton from '@/components/ErrorButton'

describe('test error button component', () => {
  test('button should render when there has failureMessage', () => {
    const props = {
      failureMessage: 'failure message'
    }
    const wrapperWithMessage = shallow(<ErrorButton {...props} />)
    expect(wrapperWithMessage.find('.error_button')).toExist();
  })
  test('button should not render when there not has failureMessage', () => {
    const props = {
      failureMessage: ''
    }
    const wrapperWithMessage = shallow(<ErrorButton {...props} />)
    expect(wrapperWithMessage).toBeEmptyRender();
  })
})
