import { describe, expect, it } from 'vitest'

import { isJsonValue } from '../src/index'

describe('isJsonValue', () => {
  it('accepts JSON data', () => {
    expect(isJsonValue(null)).toBe(true)
    expect(isJsonValue(true)).toBe(true)
    expect(isJsonValue(0)).toBe(true)
    expect(isJsonValue(-2.5)).toBe(true)
    expect(isJsonValue('text')).toBe(true)
    expect(isJsonValue([])).toBe(true)
    expect(isJsonValue({})).toBe(true)
    expect(isJsonValue({ a: [1, 'two', { three: null }], b: false })).toBe(true)
  })

  it('rejects anything else', () => {
    expect(isJsonValue(undefined)).toBe(false)
    expect(isJsonValue(Number.NaN)).toBe(false)
    expect(isJsonValue(Number.POSITIVE_INFINITY)).toBe(false)
    expect(isJsonValue(1n)).toBe(false)
    expect(isJsonValue(Symbol('s'))).toBe(false)
    expect(isJsonValue(() => 1)).toBe(false)
    expect(isJsonValue(new Map())).toBe(false)
    expect(isJsonValue([1, undefined])).toBe(false)
    expect(isJsonValue({ nested: { fn: () => 1 } })).toBe(false)
    const cyclic: Record<string, unknown> = {}
    cyclic.self = cyclic
    expect(isJsonValue(cyclic)).toBe(false)
  })
})
