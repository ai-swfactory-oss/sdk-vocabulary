export type FailureCategory = 'transient' | 'permanent'

export const isFailureCategory = (value: unknown): value is FailureCategory => value === 'transient' || value === 'permanent'
