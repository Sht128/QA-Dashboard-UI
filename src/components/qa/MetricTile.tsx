import { CircleDot } from 'lucide-react'

export default function MetricTile({ label, value, unit, delta, direction, helper, color }: { label: string; value: string; unit: string; delta: string; direction: 'good' | 'bad' | 'neutral'; helper: string; color: string }) { return <div className="card metric-card"><div className="metric-label">{label}<CircleDot size={12} style={{ color }} /></div><div className="metric-value" style={{ color }}>{value}<small>{unit}</small></div><div className="metric-foot"><span className={`delta delta-${direction}`}>{delta}</span><span>{helper}</span></div></div> }
