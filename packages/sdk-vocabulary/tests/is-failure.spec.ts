import { describe, expect, it } from 'vitest'

import { isFailure } from '../src/index'

describe('isFailure', () => {
  it('accepts a well-formed failure', () => {
    expect(isFailure({ category: 'transient', message: 'rate limited', retryable: true })).toBe(true)
    expect(
      isFailure({
        category: 'transient',
        message: 'rate limited',
        retryable: true,
        retryHint: { minimumWaitMs: 1000 },
        detail: { status: 429, headers: ['retry-after'] },
      }),
    ).toBe(true)
    expect(isFailure({ category: 'permanent', message: 'not found', retryable: false, detail: null })).toBe(true)
  })

  it('rejects anything else', () => {
    expect(isFailure(null)).toBe(false)
    expect(isFailure('transient')).toBe(false)
    expect(isFailure([])).toBe(false)
    expect(isFailure({ category: 'unknown', message: 'x', retryable: true })).toBe(false)
    expect(isFailure({ category: 'transient', message: 1, retryable: true })).toBe(false)
    expect(isFailure({ category: 'transient', message: 'x', retryable: true, retryHint: { minimumWaitMs: -1 } })).toBe(false)
    expect(isFailure({ category: 'transient', message: 'x', retryable: true, retryHint: 1000 })).toBe(false)
    expect(isFailure({ category: 'transient', message: 'x', retryable: true, detail: () => 1 })).toBe(false)
  })

  it('a failure says whether it is retryable', () => {
    expect(isFailure({ category: 'transient', message: 'x', retryable: true })).toBe(true)
    expect(isFailure({ category: 'transient', message: 'x', retryable: false })).toBe(true)
    expect(isFailure({ category: 'transient', message: 'x' })).toBe(false)
    expect(isFailure({ category: 'transient', message: 'x', retryable: 'yes' })).toBe(false)
    expect(isFailure({ category: 'transient', message: 'x', retryable: 1 })).toBe(false)
  })
})
