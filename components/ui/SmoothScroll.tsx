'use client'

import React, { useEffect, useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    // Sincronizza ScrollTrigger con il ciclo rAF di Lenis
    if (lenisRef.current) {
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <ReactLenis 
      root 
      ref={lenisRef}
      options={{ 
        lerp: 0.1, 
        duration: 1.2, 
        smoothWheel: true,
        wheelMultiplier: 1.1,
      }}
    >
      {children}
    </ReactLenis>
  )
}
