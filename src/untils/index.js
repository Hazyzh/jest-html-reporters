import React from 'react'
import moment from 'moment'
import { TimeIcon } from './icons'

/**
 * return calss name
 * @param {String} state
 * @param {Number} index
 */
export const getRecordClass = (status, index) => {
  if (status === 'failed') return 'row_fail'
  if (status === 'pending') return 'row_pending'
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
