import type { FinalOutcome } from '../../types/domain'

export default function HistoryStrip({ results }: { results: FinalOutcome[] }) { return <div className="history-strip" aria-label="Last 30 results">{results.map((result, index) => <span className={`history-cell ${result}`} key={index} title={result} />)}</div> }
