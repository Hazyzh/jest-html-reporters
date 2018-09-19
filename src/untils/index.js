import React from 'react'
import moment from 'moment'
import { TimeIcon } from './icons'
import raf from 'raf'

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

const OFFSETHEIGHT = 10
export function scrollTo(id) {
  const targetElement = document.getElementById(id)
  if (!targetElement) {
    return
  }
  const rect = targetElement.getBoundingClientRect()
  const container = targetElement.ownerDocument.documentElement
  const eleOffsetTop = rect.top - container.clientTop - OFFSETHEIGHT
  const scrollTop = getScroll(window, true)
  const startTime = Date.now()
  const frameFunc = () => {
    const timestamp = Date.now()
    const time = timestamp - startTime
    const nextScrollTop = easeInOutCubic(time, scrollTop, eleOffsetTop, 450)
    if (container === window) {
      window.scrollTo(window.pageXOffset, nextScrollTop)
    } else {
      (container).scrollTop = nextScrollTop
    }
    if (time < 450) {
      raf(frameFunc)
    }
  }
  raf(frameFunc)
}

function easeInOutCubic(t, b, c, d) {
  const cc = c - b
  t /= d / 2
  if (t < 1) {
    return cc / 2 * t * t * t + b
  }
  return cc / 2 * ((t -= 2) * t * t + 2) + b
}

export default function getScroll(target, top) {
  if (typeof window === 'undefined') {
    return 0
  }

  const prop = top ? 'pageYOffset' : 'pageXOffset'
  const method = top ? 'scrollTop' : 'scrollLeft'
  const isWindow = target === window

  let ret = isWindow ? target[prop] : target[method]
  // ie6,7,8 standard mode
  if (isWindow && typeof ret !== 'number') {
    ret = window.document.documentElement[method]
  }

  return ret
}
