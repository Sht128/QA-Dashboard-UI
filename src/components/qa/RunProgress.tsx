import { Activity } from 'lucide-react'

export default function RunProgress({ value, label = 'Run progress' }: { value: number; label?: string }) { return <div className="run-progress"><div className="progress-heading"><span><Activity size={13} />{label}</span><strong>{value}%</strong></div><div className="progress-track"><div className="progress-fill" style={{ width: `${value}%` }} /></div><div className="progress-meta">Live updates every 10 seconds · 1,284 of 1,783 attempts complete</div></div> }
