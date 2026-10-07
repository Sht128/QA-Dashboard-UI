import { BarChart3, Table2 } from 'lucide-react'
import { Button } from '../ui/button'

export default function ChartTableToggle({ table, onChange }: { table: boolean; onChange: (table: boolean) => void }) { return <Button variant="outline" onClick={() => onChange(!table)}>{table ? <BarChart3 size={13} /> : <Table2 size={13} />}{table ? 'Chart view' : 'Table view'}</Button> }
