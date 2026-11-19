import { describe, expect, it } from 'vitest'

import { isRetryHint } from '../src/index'

describe('isRetryHint', () => {
  it('accepts a well-formed retry hint', () => {
    expect(isRetryHint({ minimumWaitMs: 0 })).toBe(true)
    expect(isRetryHint({ minimumWaitMs: 1500 })).toBe(true)
  })

  it('rejects anything else', () => {
    expect(isRetryHint(null)).toBe(false)
    expect(isRetryHint(1500)).toBe(false)
    expect(isRetryHint([1500])).toBe(false)
    expect(isRetryHint({ minimumWaitMs: '1500' })).toBe(false)
  })

  it('a retry hint carries a minimum wait', () => {
    expect(isRetryHint({ minimumWaitMs: 250 })).toBe(true)
    expect(isRetryHint({})).toBe(false)
    expect(isRetryHint({ minimumWaitMs: -1 })).toBe(false)
    expect(isRetryHint({ minimumWaitMs: Number.NaN })).toBe(false)
    expect(isRetryHint({ minimumWaitMs: Number.POSITIVE_INFINITY })).toBe(false)
  })
})
