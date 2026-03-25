'use client'

import React, { memo } from 'react'

const sizeMap = {
  sm: 24,
  md: 40,
  lg: 64,
  xl: 96,
}

export interface SoapBubbleProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  delay?: number
  className?: string
  style?: React.CSSProperties
}

export const SoapBubble = memo(function SoapBubble({ 
  size = 'md', 
  delay = 0, 
  className = '', 
  style = {} 
}: SoapBubbleProps) {
  const pixelSize = sizeMap[size]
  // Generiamo un ID univoco basato su delay e size per evitare problemi di reference con il gradient SVG
  const gradientId = `bubble-grad-${String(delay).replace('.','')}-${size}`

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 100 100"
      aria-hidden="true"
      style={{ animationDelay: `${delay}s`, ...style }}
      className={`bubble-rise ${className}`}
    >
      <defs>
        <radialGradient id={gradientId} cx="35%" cy="35%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="40%" stopColor="rgba(212,88,26,0.08)" />
          <stop offset="100%" stopColor="rgba(42,122,123,0.15)" />
        </radialGradient>
      </defs>
      
      <circle
        cx="50"
        cy="50"
        r="46"
        fill={`url(#${gradientId})`}
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.5"
      />
      
      {/* Highlight interno: simuliamo il riflesso realistico della bolla */}
      <ellipse
        cx="38"
        cy="32"
        rx="12"
        ry="7"
        fill="rgba(255,255,255,0.7)"
        transform="rotate(-30 38 32)"
      />
    </svg>
  )
})

export const BubbleField = memo(function BubbleField() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
      <SoapBubble className="absolute" style={{ top: '70%', left: '62%' }} delay={0} size="md" />
      <SoapBubble className="absolute" style={{ top: '50%', left: '75%' }} delay={1.2} size="md" />
      <SoapBubble className="absolute" style={{ top: '80%', left: '80%' }} delay={2.4} size="sm" />
      <SoapBubble className="absolute" style={{ top: '40%', left: '68%' }} delay={0.8} size="lg" />
      <SoapBubble className="absolute" style={{ top: '65%', left: '55%' }} delay={3.1} size="xl" />
      <SoapBubble className="absolute" style={{ top: '30%', left: '72%' }} delay={1.8} size="sm" />
    </div>
  )
})
