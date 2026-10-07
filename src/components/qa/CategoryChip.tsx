import { categoryTokens } from '../../lib/tokens'
import type { Category } from '../../types/domain'

export default function CategoryChip({ category }: { category: Category }) { const token = categoryTokens[category]; return <span className={`chip ${category === 'quarantined' ? 'chip-outline' : ''}`} style={{ color: token.variable, background: category === 'quarantined' ? 'transparent' : `color-mix(in srgb, ${token.variable} 12%, transparent)`, borderColor: category === 'quarantined' ? token.variable : undefined }}>{token.label}</span> }
