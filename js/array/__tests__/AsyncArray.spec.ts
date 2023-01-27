import {describe, expect, it} from 'vitest'
import {AsyncArray} from '../src/AsyncArray'

describe('Testing AsyncArray', () => {
  it('Testing mapAsync', async () => {
    const res = await new AsyncArray(1, 2, 3, 4, 5).mapAsync(async (x) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(x * 2), 100)
      })
    })
    expect(res).toEqual([2, 4, 6, 8, 10])
  })

  it('Testing filterAsync', async () => {
    const res = await new AsyncArray(1, 2, 3, 4, 5).filterAsync(async (x) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(x % 2 === 0), 100)
      })
    })
    expect(res).toEqual([2, 4])
  })
})
