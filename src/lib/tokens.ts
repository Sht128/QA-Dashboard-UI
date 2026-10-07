import { AlertTriangle, CircleDot, Info, ShieldCheck, Sparkles, TestTube2, type LucideIcon } from 'lucide-react'
import type { Category, FinalOutcome } from '../types/domain'

export const outcomeTokens: Record<FinalOutcome, { label: string; variable: string; icon: LucideIcon }> = {
  passed: { label: 'Passed', variable: 'var(--outcome-passed)', icon: CircleDot },
  flaky: { label: 'Flaky', variable: 'var(--outcome-flaky)', icon: Sparkles },
  failed: { label: 'Failed', variable: 'var(--outcome-failed)', icon: AlertTriangle },
  skipped: { label: 'Skipped', variable: 'var(--outcome-skipped)', icon: Info },
}
export const categoryTokens: Record<Category, { label: string; variable: string; icon: LucideIcon }> = {
  product_bug: { label: 'Product bug', variable: 'var(--cat-product-bug)', icon: AlertTriangle },
  flaky: { label: 'Flaky', variable: 'var(--cat-flaky)', icon: Sparkles },
  test_broken: { label: 'Test broken', variable: 'var(--cat-test-broken)', icon: TestTube2 },
  environment: { label: 'Environment', variable: 'var(--cat-environment)', icon: Info },
  needs_triage: { label: 'Needs triage', variable: 'var(--cat-needs-triage)', icon: AlertTriangle },
  quarantined: { label: 'Quarantined', variable: 'var(--cat-quarantined)', icon: ShieldCheck },
}
export const categoryKeys = Object.keys(categoryTokens) as Category[]
