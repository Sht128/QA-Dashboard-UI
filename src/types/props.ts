import type { Attempt, BugLink, Category, Run, TestCase } from './domain'
import type { RunCounts } from '../lib/metrics'

export type FailureRow = { id: string; category: Category; module: string; group: string; signature: string; filePath: string; occurrences: number; flavor: string; bugLink?: BugLink; commit: string; errorMessage: string; stack: string; lastStep: string; logExcerpt: string; screenshotUrl: string; isNew?: boolean }
export type OverviewProps = { run: Run; previousRun: Run; counts: RunCounts; previousCounts: RunCounts; passRate: number; firstAttemptPassRate: number; failures: FailureRow[]; tests: TestCase[]; attempts: Attempt[] }
export type RunsIndexProps = { runs: Run[]; counts: Record<string, RunCounts>; attempts: Attempt[]; tests: TestCase[] }
export type RunShowProps = { run: Run; counts: RunCounts; failures: FailureRow[]; attempts: Attempt[]; tests: TestCase[] }
export type FailuresIndexProps = { failures: FailureRow[]; modules: string[] }
export type TestsIndexProps = { tests: TestCase[] }
export type TestShowProps = { test: TestCase; attempts: Attempt[]; runs: Run[] }
export type TrendsProps = { trends: Array<{ date: string; rep: number; direct: number; failures: number; flaky: number }>; moduleRows: Array<{ module: string; values: Array<'good' | 'mid' | 'bad'> }>; failuresByCategory: Array<{ date: string; product_bug: number; flaky: number; needs_triage: number }> }
export type SettingsProps = { modules: string[]; role: 'Viewer' | 'QA' | 'Admin' }
