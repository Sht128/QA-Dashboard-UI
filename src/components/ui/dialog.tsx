import type { ReactNode } from 'react'

export function Dialog({ open, children }: { open: boolean; children: ReactNode }) { return open ? <div className="modal-backdrop">{children}</div> : null }
export function DialogContent({ children, className = '' }: { children: ReactNode; className?: string }) { return <div className={`modal ${className}`}>{children}</div> }
