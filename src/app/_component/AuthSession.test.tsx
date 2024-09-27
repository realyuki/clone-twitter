import { expect, test } from 'vitest'

test('', () => {
  const sum = (arg1: number, arg2: number) => {
    return arg1 + arg2
  }
  expect(sum(1, 2)).toBe(5)
})
