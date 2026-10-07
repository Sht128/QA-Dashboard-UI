import { attempts, modules, runs, tests } from './data'
import { firstAttemptPassRate, passRate, runCounts } from '../lib/metrics'
import type { Attempt, BugLink, Category, Run, TestCase } from '../types/domain'
import type { FailureRow } from '../types/props'

export type LatestRunProps = { run: Run; previousRun: Run; counts: ReturnType<typeof runCounts>; previousCounts: ReturnType<typeof runCounts>; passRate: number; firstAttemptPassRate: number; failures: FailureRow[]; attempts: Attempt[]; tests: TestCase[] }
export const latestRun = runs[0]
const categories: Category[] = ['product_bug', 'needs_triage', 'flaky', 'product_bug', 'test_broken', 'quarantined']
export function buildFailures(): FailureRow[] { return tests.slice(0, 11).map((test, index) => { const testAttempts = attempts.filter(attempt => attempt.runId === latestRun.id && attempt.testId === test.id); const failedAttempts = testAttempts.filter(attempt => attempt.status === 'failed' || attempt.status === 'errored'); const firstFailure = failedAttempts[0]; const bugLink: BugLink | undefined = index === 0 ? { adoId: 'BUG-1842', state: 'open', title: 'FOC item omitted from sales order payload' } : index === 2 ? { adoId: 'BUG-1799', state: 'investigating', title: 'Transfer banner intermittently missing' } : index === 4 ? { adoId: 'BUG-1816', state: 'resolved', title: 'Auth test fixture update' } : undefined; return { id: `failure-${test.id}`, category: categories[index % categories.length], module: test.module, group: test.group, signature: `(${test.adoTestCaseId}) ${test.name}`, filePath: `${test.filePath}:${142 + index * 17}`, occurrences: Math.max(1, failedAttempts.length), flavor: test.flavor, bugLink, commit: latestRun.commitSha, errorMessage: firstFailure?.errorMessage ?? 'Expected state did not match actual state', stack: firstFailure?.stack ?? 'package:flutter_test/src/binding.dart:1234:9', lastStep: firstFailure?.lastStep ?? 'Assert final state', logExcerpt: firstFailure?.logExcerpt ?? '[02:31:04] assertion failed', screenshotUrl: firstFailure?.screenshotUrl ?? '/evidence/failure.png', isNew: index < 4 } }) }
export function getLatestProps(): LatestRunProps { const counts = runCounts(latestRun, attempts, tests); const previousCounts = runCounts(runs[1], attempts, tests); return { run: latestRun, previousRun: runs[1], counts, previousCounts, passRate: passRate(counts), firstAttemptPassRate: firstAttemptPassRate(counts), failures: buildFailures(), attempts, tests } }
export function getRun(id: string) { const run = runs.find(item => item.id === id) ?? latestRun; return { run, counts: runCounts(run, attempts, tests), failures: buildFailures(), attempts, tests } }
export function getFailureProps() { return { failures: buildFailures(), modules } }
export function getTest(id: string) { return { test: tests.find(item => item.id === id) ?? tests[0], attempts, runs } }
export function getTrendsProps() {
  const values = ['08 Sep', '12 Sep', '16 Sep', '20 Sep', '24 Sep', '28 Sep', '02 Oct', '07 Oct']
  return {
    trends: values.map((date, index) => ({ date, rep: Number((93.1 + index * .7).toFixed(1)), direct: Number((91.8 + index * .65).toFixed(1)), failures: Math.max(18, 31 - index * 2), flaky: 14 + index })),
    moduleRows: modules.slice(0, 8).map((module, index) => ({ module, values: Array.from({ length: 7 }, (_, cell) => (cell === 1 && index === 4 ? 'bad' : cell === 2 && index % 3 === 0 ? 'mid' : 'good')) as Array<'good' | 'mid' | 'bad'> })),
    failuresByCategory: values.map((date, index) => ({ date, product_bug: Math.max(3, 7 - index % 4), flaky: 14 + index, needs_triage: Math.max(5, 11 - index) })),
  }
}
