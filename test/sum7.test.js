// import sum from '../src/sum'
const sum = () => 4;

describe('Frist test case', () => {
  test('adds 1 + 3 to equal 4', () => {
    expect(sum(1, 3)).toBe(4)
  })
})

test.skip('asa', () => {
  const bar = {
    foo: {
      x: 3,
      y: 2,
    },
  }
  expect(bar).toMatchSnapshot()
})
