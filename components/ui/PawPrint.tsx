'use client'

import React, { memo } from 'react'
import { cn } from '@/lib/utils'

export type PawSize = 'xs' | 'sm' | 'md' | 'lg'
export type PawColor = 'orange' | 'teal' | 'brown' | 'orange-light' | 'teal-light'

export interface PawPrintProps {
  color?: PawColor
  size?: PawSize
  angle?: number
  className?: string
  style?: React.CSSProperties
}

const sizeMap: Record<PawSize, number> = {
  xs: 16,
  sm: 24,
  md: 36,
  lg: 48,
}

const colorClassMap: Record<PawColor, string> = {
  orange: 'text-orange',
  teal: 'text-teal',
  brown: 'text-brown',
  'orange-light': 'text-orange-light',
  'teal-light': 'text-teal-light',
}

export const PawPrint = memo(function PawPrint({
  color = 'orange',
  size = 'md',
  angle = 0,
  className,
  style,
}: PawPrintProps) {
  const pixelSize = sizeMap[size]

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={cn(colorClassMap[color], className)}
      style={{
        transform: `rotate(${angle}deg)`,
        ...style,
      }}
      fill="currentColor"
    >
      {/* Cuscinetto centrale - Profilatura arrotondata e bilobata con forma realistica */}
      <path d="M 50 85 C 25 85 20 60 35 55 C 40 53 45 60 50 60 C 55 60 60 53 65 55 C 80 60 75 85 50 85 Z" />
      
      {/* 4 Dita (cuscinetti digitali) distribuite ad arco sopra il cuscinetto plantare */}
      <ellipse cx="25" cy="45" rx="8" ry="12" transform="rotate(-35 25 45)" />
      <ellipse cx="40" cy="28" rx="8" ry="13" transform="rotate(-15 40 28)" />
      <ellipse cx="60" cy="28" rx="8" ry="13" transform="rotate(15 60 28)" />
      <ellipse cx="75" cy="45" rx="8" ry="12" transform="rotate(35 75 45)" />
    </svg>
  )
})
