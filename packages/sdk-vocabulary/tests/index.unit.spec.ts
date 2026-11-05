import { describe, expect, it } from 'vitest'

import { isFailureCategory } from '../src/index'

describe('isFailureCategory', () => {
  it('accepts a known failure category', () => {
    expect(isFailureCategory('transient')).toBe(true)
    expect(isFailureCategory('permanent')).toBe(true)
  })

  it('rejects anything else', () => {
    expect(isFailureCategory('unknown')).toBe(false)
    expect(isFailureCategory(1)).toBe(false)
  })
})
