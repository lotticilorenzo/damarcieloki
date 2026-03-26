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
      
      const paths = [path1Ref.current, path2Ref.current]
      
      paths.forEach((path) => {
        if (!path) return
        
        const length = path.getTotalLength()
        
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        
        gsap.to(path, { 
          strokeDashoffset: 0, 
          ease: 'none', 
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: 'top 70%', 
            end: 'center center', 
            scrub: 1 
          }
        })
      })

      // Pop dei nodi elastici all'ingresso in viewport
      gsap.from('.process-node', {
        scale: 0, 
        opacity: 0, 
        stagger: 0.3, 
        ease: 'elastic.out(1, 0.4)',
        duration: 0.8,
        scrollTrigger: { 
          trigger: sectionRef.current, 
          start: 'top 60%',  
          once: true 
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-36 bg-bg-alt relative overflow-hidden z-10">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 w-full">
        
        <div className="mb-12 md:mb-24 flex justify-center text-center">
          <h2 className="font-heading font-extrabold text-brown text-[clamp(32px,8vw,44px)] tracking-tight">
            Come funziona
          </h2>
        </div>

        {/* Layout degli step e tracciato dei connettori */}
        <div className="relative mt-8 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-12 md:gap-6 lg:gap-8 w-full z-10">
          
          {/* Connettori SVG assoluti: disegnano sinuosamente i gap fra i nodi (visibili solo md+) */}
          <div className="hidden md:block absolute top-[50%] left-[8%] right-[8%] h-[120px] -translate-y-1/2 pointer-events-none z-0">
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 1000 100" 
              preserveAspectRatio="none" 
              aria-hidden="true"
            >
              {/* Curva da Step 1 a Step 2 */}
              <path 
                ref={path1Ref}
                className="connector-path" 
                fill="none" 
                stroke="#D4581A" 
                strokeWidth="2.5" 
                strokeDasharray="8 6" 
                opacity="0.5" 
                d="M 160 50 C 280 15, 380 85, 500 50" 
              />
              {/* Curva da Step 2 a Step 3 */}
              <path 
                ref={path2Ref}
                className="connector-path" 
                fill="none" 
                stroke="#D4581A" 
                strokeWidth="2.5" 
                strokeDasharray="8 6" 
                opacity="0.5" 
                d="M 500 50 C 620 15, 720 85, 840 50" 
              />
            </svg>
          </div>

          <ProcessStep step={stepsPrenotazione[0]} />
          <ProcessStep step={stepsPrenotazione[1]} />
          <ProcessStep step={stepsPrenotazione[2]} />

        </div>

      </div>
    </section>
  )
}
