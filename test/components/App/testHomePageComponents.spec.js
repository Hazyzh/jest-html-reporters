import React from 'react'
import { mount } from 'enzyme'

import App from '@/app.js'

import { BackTop } from 'antd'
import HomePage from '@/pages/Home'
import TableItem from '@/components/Table'
import DashBoard from '@/components/DashBoard'
import Information from '@/components/Information'

const wrapper = mount(<App />, {
  disableLifecycleMethods: false
})
const homePage = wrapper.find(HomePage)


describe('test home page component info', () => {

  test('there should be default page title', () => {
    expect(document.title).toBe("Report");
  })

  test('there should have a BackTop in homePage', () => {
    const homePageBackTop = homePage.find(BackTop)
    expect(homePageBackTop.length).toBe(1)
  })

  test('there should have a TableItem info in homePage component', () => {
    const homePageTableItem = homePage.find(TableItem)
    expect(homePageTableItem.length).toBe(1)
  })

  test('there should have a DashBoard info in homePage component', () => {
    const homePageDashBoard = homePage.find(DashBoard)
    expect(homePageDashBoard.length).toBe(1)
  })

  test('there should have a Information info in homePage component', () => {
    const homePageInformation = homePage.find(Information)
    expect(homePageInformation.length).toBe(1)
  })

})

describe('test section titles', () => {
  test('there should have three titles',() => {
    const areaSubjects = homePage.find('h3.area_subject')
    expect(areaSubjects.length).toBe(3)
  })
})