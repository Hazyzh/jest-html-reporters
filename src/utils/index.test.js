import {
  getExecutionResult,
  getExistKeys,
  getRecordClass,
} from './index';

describe('Test Func  ==> `getRecordClass` :', () => {

  test('should return `row_fail` is state is failed', () => {
    const state = 'failed'
    expect(getRecordClass(state, 0)).toBe('row_failed-0')
    expect(getRecordClass(state, 1)).toBe('row_failed-1')
    expect(getRecordClass(state, 9)).toBe('row_failed-9')
  })
  test('should return `row_pending` is state is pending', () => {
    const state = 'pending'
    expect(getRecordClass(state, 0)).toBe('row_pending-0')
    expect(getRecordClass(state, 3)).toBe('row_pending-3')
    expect(getRecordClass(state, 8)).toBe('row_pending-8')
  })

  test('should return `row_todo` is state is todo', () => {
    const state = 'todo'
    expect(getRecordClass(state, 0)).toBe('row_todo-0')
    expect(getRecordClass(state, 1)).toBe('row_todo-1')
    expect(getRecordClass(state, 8)).toBe('row_todo-8')
  })
})

describe('Test Func  ==> `getExistKeys` :', () => {
  test('empty object should return []', () => {
    const emptyObject = {}
    const res = getExistKeys(emptyObject, false)
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
    const res = getExistKeys(emptyObject, false)
    expect(res).toEqual(['true', 'string'])
  })
})

describe('Test Func  ==> `getExecutionResult` :', () => {
  test('should return count duration and end time', () => {
    const originData = [{
      perfStats: { start: 1000, runtime: 2000, end: 3000},
      testResults: [{ duration: 1000 }]
    }];
    const emptyObject = [{
      perfStats: { start: 1000, runtime: 1000, end: 2000},
      testResults: [{ duration: 1000 }]
    }];
    const res = getExecutionResult(originData)
    expect(res).toEqual(emptyObject);
  })
})