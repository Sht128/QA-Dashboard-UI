export const titleCase = (value: string) => value.replaceAll('_', ' ').replace(/\b\w/g, letter => letter.toUpperCase())
export const number = (value: number) => new Intl.NumberFormat('en-US').format(value)
export const dateLabel = (value: string) => new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(value))
export const durationSeconds = (startedAt: string, finishedAt?: string) => finishedAt ? Math.max(0, Math.round((new Date(finishedAt).getTime() - new Date(startedAt).getTime()) / 1000)) : 0
export const durationLabel = (startedAt: string, finishedAt?: string) => { const seconds = durationSeconds(startedAt, finishedAt); if (!finishedAt) return 'In progress'; return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, '0')}s` }
