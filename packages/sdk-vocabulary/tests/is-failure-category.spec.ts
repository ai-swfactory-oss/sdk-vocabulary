import { describe, expect, it } from 'vitest'

import { FAILURE_CATEGORIES, isFailureCategory } from '../src/index'

describe('isFailureCategory', () => {
  it('accepts each failure category', () => {
    expect(FAILURE_CATEGORIES).toEqual(['transient', 'permanent'])
    for (const category of FAILURE_CATEGORIES) {
      expect(isFailureCategory(category)).toBe(true)
    }
  })

  it('rejects anything else', () => {
    expect(isFailureCategory('unknown')).toBe(false)
    expect(isFailureCategory('Transient')).toBe(false)
    expect(isFailureCategory(1)).toBe(false)
    expect(isFailureCategory(null)).toBe(false)
    expect(isFailureCategory(undefined)).toBe(false)
    expect(isFailureCategory({ category: 'transient' })).toBe(false)
  })
})
