'use client'
import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { cn } from '@/lib/utils'

interface PeekabooElementProps {
  children: React.ReactNode
  className?: string
  yStart?: number | string
  yEnd?: number | string
  xStart?: number | string
  xEnd?: number | string
  start?: string
  end?: string
  scrub?: number | boolean
}

export function PeekabooElement({ 
  children, 
  className, 
  yStart = 50, 
  yEnd = -50, 
  xStart = 0, 
  xEnd = 0, 
  start = "top bottom", 
  end = "bottom top",
  scrub = 1.2
}: PeekabooElementProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)
    
    // Rispettiamo le preferenze utente (best practice Awwwards)
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, 
        { y: yStart, x: xStart },
        {
          y: yEnd,
          x: xEnd,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: start,
            end: end,
            scrub: scrub
          }
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [yStart, yEnd, xStart, xEnd, start, end, scrub])

  return (
    <div ref={ref} className={cn("absolute z-0 pointer-events-none will-change-transform", className)}>
      {children}
    </div>
  )
}
