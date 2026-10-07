import { describe, expect, it } from 'vitest'
import { attempts, runs, tests } from '../mock/data'
import { finalOutcome, firstAttemptPassRate, passRate, runCounts } from './metrics'

describe('QA dashboard metric definitions', () => {
  it('derives the sample latest nightly counts from attempts', () => {
    const counts = runCounts(runs[0], attempts, tests)
    expect(counts).toEqual({ tests: 987, passed: 930, flaky: 27, failed: 18, skipped: 12 })
    expect(passRate(counts)).toBeCloseTo(98.2, 1)
    expect(firstAttemptPassRate(counts)).toBeCloseTo(95.4, 1)
  })

  it('classifies a passed-after-failure attempt sequence as flaky', () => {
    expect(finalOutcome([
      { runId: 'r', testId: 't', attemptNo: 1, status: 'failed', durationMs: 10 },
      { runId: 'r', testId: 't', attemptNo: 2, status: 'passed', durationMs: 10 },
    ])).toBe('flaky')
  })

  it('excludes skipped tests from both rates', () => {
    const counts = { tests: 4, passed: 2, flaky: 1, failed: 0, skipped: 1 }
    expect(passRate(counts)).toBe(100)
    expect(firstAttemptPassRate(counts)).toBeCloseTo(66.7, 1)
  })
})
