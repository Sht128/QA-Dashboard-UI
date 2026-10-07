export type Trigger = 'schedule' | 'dashboard' | 'manual' | 'local'
export type Flavor = 'rep' | 'direct'
export type RunStatus = 'queued' | 'running' | 'completed' | 'incomplete' | 'cancelled'
export type FinalOutcome = 'passed' | 'flaky' | 'failed' | 'skipped'
export type AttemptStatus = 'passed' | 'failed' | 'skipped' | 'errored'
export type Category = 'product_bug' | 'flaky' | 'test_broken' | 'environment' | 'needs_triage' | 'quarantined'
export type ClassificationState = 'provisional' | 'final'
export type ClassificationSource = 'rule' | 'override'

export type Run = {
  id: string; trigger: Trigger; flavor: Flavor; scope: string; branch: string; commitSha: string; buildNumber: string
  status: RunStatus; startedAt: string; finishedAt?: string
}
export type TestCase = { id: string; adoTestCaseId: string | null; name: string; module: string; group: string; flavor: Flavor; filePath: string; quarantined: boolean; flakinessScore: number }
export type Attempt = { runId: string; testId: string; attemptNo: number; status: AttemptStatus; durationMs: number; errorMessage?: string; stack?: string; lastStep?: string; logExcerpt?: string; screenshotUrl?: string }
export type Classification = { category: Category; state: ClassificationState; source: ClassificationSource }
export type Signature = { id: string; exceptionType: string; message: string; topFrame: string; tests: string[]; occurrences: number }
export type BugLink = { adoId: string; state: 'open' | 'investigating' | 'resolved'; title: string }
