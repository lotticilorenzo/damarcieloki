'use client'

import React, { memo } from 'react'
import { PawPrint } from './PawPrint'
import { cn } from '@/lib/utils'

export interface PawDividerProps {
  className?: string
}

export const PawDivider = memo(function PawDivider({ className }: PawDividerProps) {
  return (
    <div 
      className={cn("flex flex-row items-center justify-center gap-6 py-8", className)}
      aria-hidden="true"
    >
      {/* Zampa 1 - Nascosta su mobile */}
      <div className="hidden md:block translate-y-0">
        <PawPrint color="orange-light" size="sm" angle={-15} />
      </div>

      {/* Zampa 2 - Mobile 1 di 3 (-4px off) */}
      <div className="-translate-y-1">
        <PawPrint color="teal-light" size="sm" angle={10} />
      </div>

      {/* Zampa 3 - Mobile 2 di 3 (Centro) */}
      <div className="translate-y-0">
        <PawPrint color="orange-light" size="sm" angle={-5} />
      </div>

      {/* Zampa 4 - Mobile 3 di 3 (+4px off) */}
      <div className="translate-y-1">
        <PawPrint color="teal-light" size="sm" angle={15} />
      </div>

      {/* Zampa 5 - Nascosta su mobile */}
      <div className="hidden md:block translate-y-0">
        <PawPrint color="orange-light" size="sm" angle={-10} />
      </div>
    </div>
  )
})
