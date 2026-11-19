export type FailureCategory = 'transient' | 'permanent'

export const FAILURE_CATEGORIES: readonly FailureCategory[] = ['transient', 'permanent']

export type JsonValue = null | boolean | number | string | readonly JsonValue[] | { readonly [key: string]: JsonValue }

export interface RetryHint {
  readonly minimumWaitMs: number
}

export interface Failure {
  readonly category: FailureCategory
  readonly message: string

  readonly retryable: boolean
  readonly retryHint?: RetryHint
  readonly detail?: JsonValue
}

const isRecord = (value: unknown): value is Readonly<Record<string, unknown>> => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false
  const prototype: unknown = Object.getPrototypeOf(value)
  return prototype === Object.prototype || prototype === null
}

export const isFailureCategory = (value: unknown): value is FailureCategory => FAILURE_CATEGORIES.some(category => category === value)

const isJsonValueWithin = (value: unknown, ancestors: readonly unknown[]): boolean => {
  if (value === null || typeof value === 'boolean' || typeof value === 'string') return true
  if (typeof value === 'number') return Number.isFinite(value)
  if (ancestors.includes(value)) return false
  const within = [...ancestors, value]
  if (Array.isArray(value)) return value.every((item: unknown) => isJsonValueWithin(item, within))
  if (isRecord(value)) return Object.values(value).every(item => isJsonValueWithin(item, within))
  return false
}

export const isJsonValue = (value: unknown): value is JsonValue => isJsonValueWithin(value, [])

export const isRetryHint = (value: unknown): value is RetryHint =>
  isRecord(value) && typeof value.minimumWaitMs === 'number' && Number.isFinite(value.minimumWaitMs) && value.minimumWaitMs >= 0

export const isFailure = (value: unknown): value is Failure =>
  isRecord(value) &&
  isFailureCategory(value.category) &&
  typeof value.message === 'string' &&
  typeof value.retryable === 'boolean' &&
  (value.retryHint === undefined || isRetryHint(value.retryHint)) &&
  (value.detail === undefined || isJsonValue(value.detail))
