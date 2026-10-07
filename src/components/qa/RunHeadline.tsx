import { GitBranch } from 'lucide-react'
import { dateLabel } from '../../lib/format'
import type { Run } from '../../types/domain'
import OutcomeBadge from './OutcomeBadge'

export default function RunHeadline({ run, outcome, duration }: { run: Run; outcome: 'passed' | 'failed' | 'incomplete' | 'running'; duration: string }) { return <section className="card run-headline"><div className="headline-primary"><OutcomeBadge outcome={outcome} /><div className="run-title"><strong>{run.trigger === 'schedule' ? 'Nightly' : run.trigger} run · {dateLabel(run.startedAt)} MYT</strong><span><GitBranch size={11} style={{ verticalAlign: -2 }} /> {run.branch}</span></div></div><HeadlineField label="Trigger" value={run.trigger === 'schedule' ? 'Nightly' : run.trigger} /><HeadlineField label="Flavor" value={run.flavor} /><HeadlineField label="Commit" value={run.commitSha} mono /><HeadlineField label="Build" value={run.buildNumber} /><HeadlineField label="Duration" value={duration} /></section> }
function HeadlineField({ label, value, mono }: { label: string; value: string; mono?: boolean }) { return <div className="headline-field"><span className="label">{label}</span><b className={mono ? 'mono' : ''}>{value}</b></div> }
