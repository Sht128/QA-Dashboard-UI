import ReactECharts from 'echarts-for-react'
import { useMemo } from 'react'

function resolveTokens(value: unknown): unknown { if (typeof value === 'string' && value.startsWith('var(')) { const name = value.slice(4, -1).trim(); return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || value } if (Array.isArray(value)) return value.map(resolveTokens); if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, resolveTokens(item)])); return value }
export default function EChart({ option, className = '' }: { option: Record<string, unknown>; className?: string }) { const resolvedOption = useMemo(() => resolveTokens(option) as Record<string, unknown>, [option]); return <div className={`echart ${className}`}><ReactECharts option={resolvedOption} notMerge style={{ width: '100%', height: '100%' }} /></div> }
