import type { Attempt, FinalOutcome, Run, TestCase } from '../types/domain'

export type RunCounts = { tests: number; passed: number; flaky: number; failed: number; skipped: number }
export function finalOutcome(attempts: Attempt[]): FinalOutcome {
  if (!attempts.length || attempts.every(attempt => attempt.status === 'skipped')) return 'skipped'
  const hasPassed = attempts.some(attempt => attempt.status === 'passed')
  const hasFailure = attempts.some(attempt => attempt.status === 'failed' || attempt.status === 'errored')
  if (hasPassed && hasFailure) return 'flaky'
  if (hasPassed) return 'passed'
  return 'failed'
}
export function runCounts(run: Run, attempts: Attempt[], tests: TestCase[]): RunCounts {
  const runTestIds = new Set(attempts.filter(attempt => attempt.runId === run.id).map(attempt => attempt.testId))
  const scopedTests = tests.filter(test => runTestIds.size ? runTestIds.has(test.id) : test.flavor === run.flavor)
  const outcomes = scopedTests.map(test => finalOutcome(attempts.filter(attempt => attempt.runId === run.id && attempt.testId === test.id)))
  return { tests: outcomes.length, passed: outcomes.filter(outcome => outcome === 'passed').length, flaky: outcomes.filter(outcome => outcome === 'flaky').length, failed: outcomes.filter(outcome => outcome === 'failed').length, skipped: outcomes.filter(outcome => outcome === 'skipped').length }
}
export function passRate(counts: RunCounts): number { const denominator = counts.passed + counts.flaky + counts.failed; return denominator ? ((counts.passed + counts.flaky) / denominator) * 100 : 0 }
export function firstAttemptPassRate(counts: RunCounts): number { const denominator = counts.passed + counts.flaky + counts.failed; return denominator ? (counts.passed / denominator) * 100 : 0 }
export function runOutcome(run: Run, counts: RunCounts, quarantinedIds: Set<string>): Run['status'] extends 'running' ? never : 'passed' | 'failed' | 'incomplete' | null { if (run.status === 'running' || run.status === 'queued') return null; if (run.status === 'incomplete' || run.status === 'cancelled') return 'incomplete'; return counts.failed > quarantinedIds.size ? 'failed' : 'passed' }
export function delta(current: number, previous: number): number { return current - previous }
