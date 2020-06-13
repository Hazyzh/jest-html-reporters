import React from 'react'
import moment from 'moment'
import jump from 'jump.js'
import { TimeIcon } from './icons'

/**
 * return calss name
 * @param {String} state
 * @param {Number} index
 */
export const getRecordClass = (status, index) => {
  if (status === 'failed') return 'row_fail'
  if (status === 'pending') return 'row_pending'
  if (status === 'todo') return 'row_todo'
  if (index % 2) return 'row_pass_even'
  return 'row_pass_odd'
}
/**
 * count percentage and return format result
 * @param {Number} value
 * @param {Number} total
 * @param {Object} options
 */
export const getPercentage = (value, total, { precision = 2 } = {}) => {
  const number = value / total
  return (number * 100).toFixed(precision)
}

const InsuranceNumber = (number, minLength = 2) => {
  const len = number.toString().length
  if (len < minLength) {
    return '0'.repeat(minLength - len) + number
  }
  return number
}

/**
 * get format duration time
 * @param {Timestamp} start
 * @param {Timestamp} end
 */
export const getFormatTime = (start, end) => {
  const duration = moment.duration(end - start)
  const min = InsuranceNumber(duration.minutes())
  const sec = InsuranceNumber(duration.seconds())
  const msec = InsuranceNumber(duration.milliseconds(), 3)
  let node
  if (min !== '00') {
    node = <span className='time_active'>{`${min}:${sec}.${msec}`}</span>
  } else if (sec !== '00') {
    node = <span>
      <span className='time_minor'>{`${min}:`}</span>
      <span className='time_active'>{`${sec}.${msec}`}</span>
    </span>
  } else {
    node = <span>
      <span className='time_minor'>{`${min}:${sec}.`}</span>
      <span className='time_active'>{`${msec}`}</span>
    </span>
  }
  return <span className='time_box'>
    <TimeIcon />
    {node}
  </span>
}

export const getFormatData = (data = []) => {
  return data.map(({ numFailingTests, numPassingTests, numPendingTests,
    testResults, testFilePath, perfStats: { end, start } }) => ({
    name: testFilePath,
    time: (end - start) / 1000,
    numFailingTests,
    numPassingTests,
    numPendingTests,
    testResults,
  })).sort(
    (a, b) => b.time - a.time
  )
}

const OFFSETHEIGHT = -10
export function scrollTo(id, expandFunc = () => {}) {
  const targetElement = document.getElementById(id)
  if (!targetElement) {
    return
  }
  jump(targetElement, {
    duration: 500,
    offset: OFFSETHEIGHT,
    callback: () => expandFunc({ key: id, state: true }),
    a11y: false
  })
}

/**
 * @param {Object} obj
 * @param {Bool}
 * @return {Array} object exist keys list
 */
export const getExistKeys = (obj = {}, globalExpandState) => {
  return Object.entries(obj).filter(item => (globalExpandState || item[1])).map(item => item[0])
}

/**
 * format timestamp to yy-MM-dd hh:mm:ss
 * @param {number} timestamp
 */
export const formatDate = (timestamp) =>
  new Date(timestamp - new Date().getTimezoneOffset() * 60 * 1000)
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ')
/**
 *
 * @param {Object} data
 * @param {Number} groupLevel
 */
export const formatCollapsableData = (data, groupLevel = 1) => {
  const ancestorMap = new Map()
  const mySpecialText = '@@@@@Report@@@@@'
  const rootArry = []
  data.forEach((item, index) => {
    const { ancestorTitles } = item
    if (ancestorTitles.length < groupLevel) {
      rootArry.push(item)
    } else {
      const mapKey = ancestorTitles.slice(0, groupLevel).join(mySpecialText)
      ancestorMap.set(mapKey, [...ancestorMap.get(mapKey) || [], { ...item, ancestorTitles: item.ancestorTitles.slice(groupLevel) }])
    }
  })
  for (const ancestorKey of ancestorMap.keys()) {
    const tests = ancestorMap.get(ancestorKey)
    const item = {
      subTitle: ancestorKey.replace(new RegExp(mySpecialText, 'g'), ' => '),
      subGroups: true,
      tests,
      numFailingTests: tests.filter(item => item.status === 'failed').length,
      numPassingTests: tests.filter(item => item.status === 'passed').length,
      numPendingTests: tests.filter(item => item.status === 'pending').length,
      numTodoTests: tests.filter(item => item.status === 'todo').length,
    }
    rootArry.push(item)
  }
  return rootArry
}

export const renderRootRowClass = ({ numFailingTests, numPendingTests, numTodoTests, testExecError }, index) => {
  let status = ''
  if (testExecError) status = 'failed'
  else if (numFailingTests) status = 'failed'
  else if (numPendingTests) status = 'pending'
  else if (numTodoTests) status = 'todo'
  return getRecordClass(status, index)
}
