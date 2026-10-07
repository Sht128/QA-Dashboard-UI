import type { ReactNode } from 'react'

export function Sheet({ open, children }: { open: boolean; children: ReactNode }) { return open ? <div className="modal-backdrop sheet-backdrop">{children}</div> : null }
export function SheetContent({ children, className = '' }: { children: ReactNode; className?: string }) { return <aside className={`sheet-content ${className}`}>{children}</aside> }
