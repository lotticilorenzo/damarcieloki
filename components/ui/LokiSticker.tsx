'use client'

import React, { memo } from 'react'
import { motion, Variants, TargetAndTransition } from 'framer-motion'
import { LokiExpression } from '@/types'
import { cn } from '@/lib/utils'

export type LokiSize = 'sm' | 'md' | 'lg'

export interface LokiStickerProps {
  expression?: LokiExpression
  size?: LokiSize
  className?: string
  fetchPriority?: 'high' | 'low' | 'auto'
}

const sizeMap: Record<LokiSize, number> = {
  sm: 48,
  md: 80,
  lg: 120,
}

export const LokiSticker = memo(function LokiSticker({
  expression = 'happy',
  size = 'md',
  className,
  fetchPriority,
}: LokiStickerProps) {
  const pixelSize = sizeMap[size]

  // Hover animation for the wrapper
  const hoverVariants: Variants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1, 
      transition: { type: 'spring', stiffness: 300, damping: 15 } 
    }
  }

  const expressionAnimation = (): TargetAndTransition => {
    switch (expression) {
      case 'happy':
        return {
          y: [0, -6, 0],
          transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        } as TargetAndTransition
      case 'confused':
        return {
          rotate: [0, -4, 4, -4, 4, 0, 0],
          transition: { 
            duration: 4, 
            repeat: Infinity,
            times: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 1],
            ease: 'easeInOut' 
          }
        } as TargetAndTransition
      case 'curious':
        return {
          rotate: [-8, 2, -8],
          transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
        } as TargetAndTransition
      case 'approves':
        return {
          y: [0, -3, 0],
          transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        } as TargetAndTransition
      default:
        return {} as TargetAndTransition
    }
  }

  return (
    <motion.div
      variants={hoverVariants}
      initial="initial"
      whileHover="hover"
      animate={expressionAnimation()}
      className={cn("relative inline-flex flex-shrink-0 cursor-pointer", className)}
      style={{ width: pixelSize, height: pixelSize }}
      role="img"
      aria-label="Loki il barboncino di Marci"
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        className="overflow-visible"
        fetchPriority={fetchPriority}
        aria-hidden="true" // Accessibilità delegata al div parent (role="img" + aria-label)
      >
        <g id="loki-head">
          {/* Orecchio Sx - Morbido e floppy */}
          <path 
            d="M 25 35 Q 10 50 15 75 Q 25 85 30 60 Z" 
            fill="var(--brown)" 
          />
          
          {/* Orecchio Dx - Reagisce alla variante 'curious' (Orecchio drizzato) */}
          {expression === 'curious' ? (
            <path 
              d="M 75 35 Q 95 20 80 15 Q 65 20 70 35 Z" 
              fill="var(--brown)" 
            />
          ) : (
            <path 
              d="M 75 35 Q 90 50 85 75 Q 75 85 70 60 Z" 
              fill="var(--brown)" 
            />
          )}

          {/* Cranio principale (Poodle/Spaniel shape) */}
          <circle cx="50" cy="45" r="32" fill="var(--brown)" />
          {/* Ciuffi ricci stilizzati sulla testa */}
          <circle cx="50" cy="15" r="14" fill="var(--brown)" />
          <circle cx="35" cy="20" r="12" fill="var(--brown)" />
          <circle cx="65" cy="20" r="12" fill="var(--brown)" />

          {/* Muso */}
          <ellipse cx="50" cy="62" rx="22" ry="16" fill="var(--brown-light)" />
          
          {/* Naso da Tartufo */}
          <ellipse cx="50" cy="55" rx="7" ry="5" fill="var(--text)" />
          <ellipse cx="48" cy="53" rx="2" ry="1.5" fill="white" opacity={0.6} />
        </g>

        {/* --- Dettagli facciali dinamici (Facial Expressions) --- */}
        
        {/* HAPPY */}
        {expression === 'happy' && (
          <g>
            <path d="M 35 40 Q 40 33 45 40" stroke="var(--text)" fill="none" strokeWidth="3" strokeLinecap="round" />
            <path d="M 55 40 Q 60 33 65 40" stroke="var(--text)" fill="none" strokeWidth="3" strokeLinecap="round" />
            
            <path d="M 42 66 Q 50 74 58 66" stroke="var(--text)" fill="none" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 45 66 Q 50 82 55 66 Z" fill="var(--orange)" />
          </g>
        )}

        {/* CONFUSED */}
        {expression === 'confused' && (
          <g>
            <circle cx="38" cy="38" r="5" fill="var(--text)" />
            <circle cx="39" cy="37" r="1.5" fill="white" />
            
            <circle cx="62" cy="38" r="7" fill="var(--text)" />
            <circle cx="63.5" cy="36.5" r="2" fill="white" />
            
            <path d="M 58 25 Q 65 20 72 26" stroke="var(--text)" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            <path d="M 40 68 Q 45 65 50 68 Q 55 71 60 68" stroke="var(--text)" fill="none" strokeWidth="2.5" strokeLinecap="round" />
            
            <motion.text 
              x="75" y="20" 
              fontSize="28" 
              fontWeight="bold" 
              fill="var(--orange)"
              animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              ?
            </motion.text>
          </g>
        )}

        {/* CURIOUS */}
        {expression === 'curious' && (
          <g>
            <circle cx="38" cy="38" r="6" fill="var(--text)" />
            <circle cx="39" cy="37" r="2" fill="white" />
            
            <circle cx="62" cy="38" r="6" fill="var(--text)" />
            <circle cx="63" cy="37" r="2" fill="white" />
            
            <ellipse cx="50" cy="70" rx="3.5" ry="5" fill="var(--text)" />
          </g>
        )}

        {/* APPROVES */}
        {expression === 'approves' && (
          <g>
            <path d="M 35 40 Q 40 33 45 40" stroke="var(--text)" fill="none" strokeWidth="3" strokeLinecap="round" />
            
            <motion.path 
              d="M 55 40 Q 60 33 65 40" 
              stroke="var(--text)" 
              fill="none" 
              strokeWidth="3" 
              strokeLinecap="round"
              style={{ transformOrigin: '60px 40px' }}
              animate={{ scaleY: [1, 1, 0.05, 1, 1] }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                times: [0, 0.8, 0.85, 0.9, 1], // Blink molto rapido ogni 4s
                ease: "easeInOut" 
              }}
            />
            
            <path d="M 40 65 Q 50 72 60 65" stroke="var(--text)" fill="none" strokeWidth="2.5" strokeLinecap="round" />

            <g transform="translate(60, 50)">
              {/* Palmo zampa */}
              <circle cx="15" cy="18" r="14" fill="var(--brown)" />
              {/* Dita (cuscinetti neri/brown) */}
              <circle cx="2" cy="7" r="4.5" fill="var(--brown)" />
              <circle cx="10" cy="1" r="4.5" fill="var(--brown)" />
              <circle cx="20" cy="1" r="4.5" fill="var(--brown)" />
              <circle cx="28" cy="7" r="4.5" fill="var(--brown)" />
              
              {/* Pads interni arancioni */}
              <circle cx="2" cy="7" r="2" fill="var(--orange)" />
              <circle cx="10" cy="1" r="2" fill="var(--orange)" />
              <circle cx="20" cy="1" r="2" fill="var(--orange)" />
              <circle cx="28" cy="7" r="2" fill="var(--orange)" />
              {/* Cuscinetto metacarpale */}
              <path d="M 8 18 C 8 13 22 13 22 18 C 22 23 15 26 8 18 Z" fill="var(--orange)" />
            </g>
          </g>
        )}
      </svg>
    </motion.div>
  )
})
