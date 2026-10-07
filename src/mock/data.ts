import type { Attempt, Run, TestCase } from '../types/domain'

export const modules = ['cart', 'document', 'system', 'business_partner', 'journey_plan', 'task', 'reward', 'trade_promotion', 'engagement', 'catalog', 'warehouse', 'trade_agreement', 'product', 'payment', 'logistics', 'workflow', 'insights', 'team']
export const groupMap: Record<string, string[]> = { cart: ['Give FOC', 'Create Sales Orders', 'Second Cart Test'], document: ['Create Order', 'Transfer Document', 'Multi Document'], system: ['Authentication', 'Download', 'Upload', 'Switch Company', 'Currency'], task: ['First Task', 'Share of Shelf'], trade_promotion: ['Bundle', 'Trade Promotion'] }

export const runs: Run[] = [
  { id: 'run-latest', trigger: 'schedule', flavor: 'rep', scope: 'All tests', branch: 'release/2610/2610.01.176', commitSha: '6a91e2d', buildNumber: '2610.01.176', status: 'completed', startedAt: '2026-10-07T02:00:00+08:00', finishedAt: '2026-10-07T02:42:18+08:00' },
  { id: 'run-previous', trigger: 'schedule', flavor: 'rep', scope: 'All tests', branch: 'release/2610/2610.01.175', commitSha: 'bf08c11', buildNumber: '2610.01.175', status: 'completed', startedAt: '2026-10-06T02:00:00+08:00', finishedAt: '2026-10-06T02:45:22+08:00' },
  { id: 'run-direct', trigger: 'manual', flavor: 'direct', scope: 'cart, document', branch: 'aisha/fix-foc', commitSha: 'c22b9a1', buildNumber: 'local', status: 'completed', startedAt: '2026-10-06T16:31:00+08:00', finishedAt: '2026-10-06T16:35:07+08:00' },
  { id: 'run-running', trigger: 'dashboard', flavor: 'rep', scope: 'product', branch: 'release/2610/2610.01.176', commitSha: '6a91e2d', buildNumber: '2610.01.176', status: 'running', startedAt: '2026-10-07T09:18:00+08:00' },
]

const moduleFor = (index: number) => modules[index % modules.length]
const groupFor = (module: string, index: number) => groupMap[module]?.[index % (groupMap[module]?.length ?? 1)] ?? 'Smoke tests'
export const tests: TestCase[] = Array.from({ length: 987 }, (_, index) => {
  const module = moduleFor(index)
  return { id: `test-${index + 1}`, adoTestCaseId: String(112345 + index), name: index === 0 ? 'Create sales order with FOC item' : index === 1 ? 'Transfer document from warehouse' : `${['Create', 'Open', 'Update', 'Verify'][index % 4]} ${module} flow ${index + 1}`, module, group: groupFor(module, index), flavor: 'rep', filePath: `integration_test/butter_rep/test_cases/${module}_test.dart`, quarantined: index === 935 || index === 936, flakinessScore: index >= 930 && index < 957 ? 11.2 : index % 31 === 0 ? 6.4 : 0.8 }
})

const outcomeFor = (index: number, previous = false) => previous ? index < 916 ? 'passed' : index < 947 ? 'flaky' : index < 971 ? 'failed' : 'skipped' : index < 930 ? 'passed' : index < 957 ? 'flaky' : index < 975 ? 'failed' : 'skipped'
const makeAttempts = (runId: string, previous = false): Attempt[] => tests.flatMap<Attempt>((test, index) => {
  const outcome = outcomeFor(index, previous)
  const durationMs = 3800 + ((index * 113) % 9000)
  if (outcome === 'skipped') return [{ runId, testId: test.id, attemptNo: 1, status: 'skipped', durationMs: 0 }]
  if (outcome === 'flaky') return [{ runId, testId: test.id, attemptNo: 1, status: 'failed', durationMs, errorMessage: 'Transient response did not settle', stack: 'WidgetTester.pumpAndSettle (binding.dart:1234)', lastStep: 'Wait for response', logExcerpt: '[02:31:04] network retry', screenshotUrl: '/evidence/network.png' }, { runId, testId: test.id, attemptNo: 2, status: 'passed', durationMs: durationMs + 600 }]
  if (outcome === 'failed') return [{ runId, testId: test.id, attemptNo: 1, status: 'failed', durationMs, errorMessage: 'Expected state did not match actual state', stack: 'package:flutter_test/src/binding.dart:1234:9', lastStep: 'Assert final state', logExcerpt: '[02:31:04] assertion failed', screenshotUrl: '/evidence/failure.png' }]
  return [{ runId, testId: test.id, attemptNo: 1, status: 'passed', durationMs }]
})
export const attempts: Attempt[] = [...makeAttempts('run-latest'), ...makeAttempts('run-previous', true), ...makeAttempts('run-direct').slice(0, 180)]
