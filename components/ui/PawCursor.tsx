'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { PawPrint } from './PawPrint'

interface Burst {
  id: number
  x: number
  y: number
}

export function PawCursor() {
  const [cursorState, setCursorState] = useState<'default' | 'pointer' | 'image' | 'hidden'>('default')
  const [bursts, setBursts] = useState<Burst[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Coordinate raw
  const mouseX = useMotionValue(-100) // Inizio fuori schermo
  const mouseY = useMotionValue(-100)

  // Spring per l'effetto lag morbido richiesto
  const springConfig = { stiffness: 150, damping: 20 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
    if (!isVisible) setIsVisible(true)
    
    // Check se siamo su un input per mostrare il cursore di testo
    const target = e.target as HTMLElement
    if (!target) return
    const isInput = target.closest('input, textarea, [contenteditable="true"]')
    if (isInput) {
      setCursorState('hidden')
    }
  }, [mouseX, mouseY, isVisible])

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target) return

    if (target.closest('a, button, [role="button"]')) {
      setCursorState('pointer')
    } else if (target.closest('img, [data-cursor="image"]')) {
      setCursorState('image')
    } else if (target.closest('input, textarea, [contenteditable="true"]')) {
      setCursorState('hidden')
    } else {
      setCursorState('default')
    }
  }, [])

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (cursorState === 'hidden') return

    const newBurst: Burst = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY
    }

    setBursts(prev => [...prev, newBurst].slice(-8)) // Massimo 8 burst simultanei

    // Cleanup del burst dopo l'animazione (400ms)
    setTimeout(() => {
      setBursts(prev => prev.filter(b => b.id !== newBurst.id))
    }, 450)
  }, [cursorState])

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Disabilita cursore su mobile (< 768px)
    const touchCheck = window.innerWidth < 768
    const motionCheck = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    setIsTouch(touchCheck)
    setReducedMotion(motionCheck)

    if (touchCheck || motionCheck) return

    // Attivazione classe globale per nascondere il cursore di sistema
    document.documentElement.classList.add('custom-cursor-active')

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [handleMouseMove, handleMouseOver, handleMouseDown])

  // Non renderizzare nulla se siamo su touch o reduced motion
  if (isTouch || reducedMotion) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none">
      {/* Cursore Principale */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          x: springX,
          y: springY,
          opacity: (isVisible && cursorState !== 'hidden') ? 0.85 : 0,
        }}
      >
        {/* Cerchio outline per stato 'image' */}
        <AnimatePresence>
          {cursorState === 'image' && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute w-12 h-12 border-2 border-dashed border-teal rounded-full animate-[spin_8s_linear_infinite]"
            />
          )}
        </AnimatePresence>

        {/* La Zampa (PawPrint) */}
        <motion.div
          animate={{
            scale: cursorState === 'pointer' ? 1.3 : 1,
            color: cursorState === 'pointer' ? '#2A7A7B' : '#D4581A', // teal vs orange
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <PawPrint size="sm" className="opacity-100!" style={{ color: 'inherit' }} />
        </motion.div>
      </motion.div>

      {/* Burst al Click */}
      <AnimatePresence>
        {bursts.map(burst => (
          <div 
            key={burst.id} 
            className="absolute top-0 left-0"
            style={{ transform: `translate(${burst.x}px, ${burst.y}px)` }}
          >
            {/* 4 micro-zampette che esplodono (N, S, E, W) */}
            {[
              { x: 0, y: -25 }, // Nord
              { x: 0, y: 25 },  // Sud
              { x: 25, y: 0 },  // Est
              { x: -25, y: 0 }  // Ovest
            ].map((dir, i) => (
              <div
                key={i}
                className="absolute animate-paw-burst -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  '--bx': `${dir.x}px`, 
                  '--by': `${dir.y}px` 
                } as React.CSSProperties}
              >
                <PawPrint size="xs" color="orange" className="opacity-60" />
              </div>
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
