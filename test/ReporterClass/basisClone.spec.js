import {
  deepClone
} from '../../helper';
import originalData from './mockOriginal.json';
import expectData from './mockExpect.json';


describe('test deepClone function', () => {
  test('deepClone data', () => {
    const res = deepClone(originalData);
    expect(res).toEqual(expectData)
  })
});
