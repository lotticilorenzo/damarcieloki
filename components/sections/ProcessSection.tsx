'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { stepsPrenotazione } from '@/data/process'
import { ProcessStep } from '../ui/ProcessStep'

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const path1Ref = useRef<SVGPathElement>(null)
  const path2Ref = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (isReduced) return

    const ctx = gsap.context(() => {
      
      // Pop dei nodi elastici all'ingresso in viewport
      gsap.from('.process-node', {
        y: 40, 
        opacity: 0, 
        stagger: 0.2, 
        ease: 'power3.out',
        duration: 0.8,
        scrollTrigger: { 
          trigger: sectionRef.current, 
          start: 'top 70%', 
          once: true 
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-36 bg-bg-alt relative overflow-hidden z-10">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 w-full">
        
        <div className="mb-16 md:mb-24 flex justify-center text-center">
          <h2 className="font-heading font-extrabold text-brown text-[clamp(32px,5vw,44px)] tracking-tight">
            Come funziona
          </h2>
        </div>

        {/* Layout degli step sfalsato */}
        <div className="relative mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 w-full z-10">
          
          <ProcessStep step={stepsPrenotazione[0]} />
          <ProcessStep step={stepsPrenotazione[1]} className="md:mt-16" />
          <ProcessStep step={stepsPrenotazione[2]} className="md:mt-32" />

        </div>

      </div>
    </section>
  )
}
