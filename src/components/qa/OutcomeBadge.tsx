import { CircleDot } from 'lucide-react'
import { outcomeTokens } from '../../lib/tokens'
import type { FinalOutcome } from '../../types/domain'

export default function OutcomeBadge({ outcome }: { outcome: FinalOutcome | 'running' | 'incomplete' }) { const token = outcome === 'running' || outcome === 'incomplete' ? { label: outcome[0].toUpperCase() + outcome.slice(1), variable: 'var(--muted)' } : outcomeTokens[outcome]; return <span className="outcome-badge" style={{ color: token.variable, background: `color-mix(in srgb, ${token.variable} 12%, transparent)` }}><CircleDot size={10} />{token.label}</span> }
