import { getRecordClass, getExistKeys } from './index'

describe('Test Func  ==> `getRecordClass` :', () => {
  test('should return `row_fail` is state is failed', () => {
    const state = 'failed'
    expect(getRecordClass(state, 0)).toBe('row_fail')
    expect(getRecordClass(state, 1)).toBe('row_fail')
    expect(getRecordClass(state, 9)).toBe('row_fail')
    expect(getRecordClass(state, 16)).toBe('row_fail')
  })
  test('should return `row_pending` is state is pending', () => {
    const state = 'pending'
    expect(getRecordClass(state, 0)).toBe('row_pending')
    expect(getRecordClass(state, 3)).toBe('row_pending')
    expect(getRecordClass(state, 8)).toBe('row_pending')
    expect(getRecordClass(state, 11)).toBe('row_pending')
  })
  test('should return `row_pass_even` is state not failed nor pending and index is even', () => {
    const state = 'passed'
    expect(getRecordClass(state, 0)).toBe('row_pass_odd')
    expect(getRecordClass(state, 2)).toBe('row_pass_odd')
    expect(getRecordClass(state, 8)).toBe('row_pass_odd')
    expect(getRecordClass(state, 16)).toBe('row_pass_odd')
  })
  test('should return `row_pass_odd` is state not failed nor pending and index is odd', () => {
    const state = 'passed'
    expect(getRecordClass(state, 1)).toBe('row_pass_even')
    expect(getRecordClass(state, 5)).toBe('row_pass_even')
    expect(getRecordClass(state, 7)).toBe('row_pass_even')
    expect(getRecordClass(state, 11)).toBe('row_pass_even')
  })
})

describe('Test Func  ==> `getExistKeys` :', () => {
  test('empty object should return []', () => {
    const emptyObject = {}
    const res = getExistKeys(emptyObject)
    expect(res).toEqual([])
  })
  test('object should return keys which is not falsy value as an array', () => {
    const emptyObject = {
      'true': true,
      'string': '1as',
      'null': null,
      'undefined': undefined,
      'false': false,
    }
    const res = getExistKeys(emptyObject)
    expect(res).toEqual(['true', 'string'])
  })
})