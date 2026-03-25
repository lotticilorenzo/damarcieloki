'use client'

import React, { memo } from 'react'
import { cn } from '@/lib/utils'

export type ScissorsSize = 'sm' | 'md' | 'lg'
export type ScissorsVariant = 'open' | 'closed'

export interface ScissorsFloatProps {
  size?: ScissorsSize
  variant?: ScissorsVariant
  className?: string
  style?: React.CSSProperties
}

const sizeMap: Record<ScissorsSize, number> = {
  sm: 32,
  md: 48,
  lg: 72,
}

// Durata sfalsata per renderle organiche quando ce ne sono più a schermo
const durationMap: Record<ScissorsSize, string> = {
  sm: '3.2s',
  md: '4.5s',
  lg: '5.1s',
}

export const ScissorsFloat = memo(function ScissorsFloat({
  size = 'md',
  variant = 'open',
  className,
  style,
}: ScissorsFloatProps) {
  const pixelSize = sizeMap[size]
  const duration = durationMap[size]
  
  // Ogni parte ruota di 15deg rispetto al centro. Insieme fanno ~30deg.
  const rotationAngle = variant === 'open' ? 15 : 0

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={cn('scissors-float', className)}
      style={{
        color: 'rgba(42, 122, 123, 0.25)', // Teal trasparente da specifiche
        animationDuration: duration,
        ...style,
      }}
    >
      {/* Lama Destra & Manico Sinistro (Pezzo Unico) */}
      <g
        style={{
          transformOrigin: '50% 50%',
          transform: `rotate(${rotationAngle}deg)`,
          transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <circle cx="36" cy="85" r="9" stroke="currentColor" fill="none" strokeWidth="4" />
        <line x1="39.5" y1="77" x2="50" y2="50" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 50 50 L 50 12 C 58 18 56 35 50 50 Z" fill="currentColor" />
      </g>

      {/* Lama Sinistra & Manico Destro (Specchiato orizzontalmente con scaleX) */}
      <g
        style={{
          transformOrigin: '50% 50%',
          transform: `scaleX(-1) rotate(${rotationAngle}deg)`,
          transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <circle cx="36" cy="85" r="9" stroke="currentColor" fill="none" strokeWidth="4" />
        <line x1="39.5" y1="77" x2="50" y2="50" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 50 50 L 50 12 C 58 18 56 35 50 50 Z" fill="currentColor" />
      </g>

      {/* Vite centrale - colorata col bg (#FFFDF8) per simulare il foro e dare spessore */}
      <circle cx="50" cy="50" r="3" fill="#FFFDF8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
})
