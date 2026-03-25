'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { PawPrint } from '../ui/PawPrint'

const milestones = [
  { year: '2009', text: 'Il primo cane entra in casa (e nel cuore)' },
  { year: '2023', text: 'Inizio corso addestratore cinofilo' },
  { year: '2025', text: 'Diploma di addestratore certificato' },
  { year: 'gen 2026', text: <Link href="/servizi" className="hover:text-orange transition-colors">Corso di toelettatura</Link> },
  { year: 'giu 2026', text: 'Apertura Da Marci & Loki a Parma' },
]

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    const mm = gsap.matchMedia()
    
    // Implementazione esatta delle specs, con cleanup manuale come richiesto (ctx.revert())
    const ctx = gsap.context(() => {
      
      mm.add("(min-width: 768px)", () => {
        // Desktop Layout - Orizzontale
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            once: true,
          }
        })

        tl.from('.timeline-line', { scaleX: 0, transformOrigin: 'left center', duration: 1.2, ease: 'power2.out' })
        tl.from('.paw-trail-item', { opacity: 0, scale: 0, stagger: 0.12, ease: 'back.out(2)', duration: 0.5 }, '-=0.8')
        tl.from('.milestone-node', { opacity: 0, scale: 0, stagger: 0.18, ease: 'elastic.out(1,0.5)', duration: 0.7 }, '-=0.6')
        tl.from('.milestone-text', { opacity: 0, y: 12, stagger: 0.12 }, '-=0.4')
      })

      mm.add("(max-width: 767px)", () => {
        // Mobile Layout - Verticale (la linea si srotola su Y)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            once: true,
          }
        })
        tl.from('.timeline-line', { scaleY: 0, transformOrigin: 'top center', duration: 1.2, ease: 'power2.out' })
        tl.from('.paw-trail-item', { opacity: 0, scale: 0, stagger: 0.12, ease: 'back.out(2)', duration: 0.5 }, '-=0.8')
        tl.from('.milestone-node', { opacity: 0, scale: 0, stagger: 0.18, ease: 'elastic.out(1,0.5)', duration: 0.7 }, '-=0.6')
        tl.from('.milestone-text', { opacity: 0, y: 12, stagger: 0.12 }, '-=0.4')
      })

    }, sectionRef)

    return () => {
      ctx.revert()
      mm.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-bg-alt overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col items-center text-center mb-20 md:mb-28">
          <h2 className="font-heading font-extrabold text-brown text-[clamp(28px,4vw,44px)] mb-5">
            Come sono arrivato qui
          </h2>
          <p className="font-sans text-text-sec text-[16px] md:text-[18px] max-w-[50ch] text-balance leading-relaxed">
            Tutto inizia nel 2009, da un cane che è entrato in casa e non ne è più uscito (dal cuore).
          </p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto">
          {/* Timeline Linee continue */}
          <div className="hidden md:block absolute top-[31px] left-[8%] right-[8%] h-[2px] bg-border-hover timeline-line" />
          <div className="md:hidden absolute top-[25px] bottom-[60px] left-[31px] w-[2px] bg-border-hover timeline-line" />

          {/* Timeline Nodi */}
          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-4 relative">
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className="flex md:flex-col items-center md:items-center relative w-full md:w-1/5 shrink-0 z-10"
              >
                
                {/* Zampette Desktop */}
                {index < milestones.length - 1 && (
                  <div className="hidden md:flex absolute top-[18px] left-[62%] w-[76%] items-center justify-evenly pointer-events-none z-0">
                    <div className="paw-trail-item"><PawPrint size="xs" color="orange-light" angle={15} /></div>
                    <div className="paw-trail-item mt-4"><PawPrint size="xs" color="teal-light" angle={-10} /></div>
                    <div className="paw-trail-item"><PawPrint size="xs" color="orange-light" angle={5} /></div>
                  </div>
                )}

                {/* Zampette Mobile */}
                {index < milestones.length - 1 && (
                  <div className="flex md:hidden absolute top-[64px] left-[17px] h-[75px] flex-col items-center justify-between pointer-events-none z-0 px-2 py-1">
                    <div className="paw-trail-item ml-5"><PawPrint size="xs" color="orange-light" angle={15} /></div>
                    <div className="paw-trail-item -ml-5 mt-2"><PawPrint size="xs" color="teal-light" angle={-5} /></div>
                    <div className="paw-trail-item ml-4 mt-2"><PawPrint size="xs" color="orange-light" angle={12} /></div>
                  </div>
                )}

                {/* Nodo Circolare */}
                <div className="milestone-node shrink-0 flex items-center justify-center w-[64px] h-[64px] rounded-full bg-white border border-[rgba(240,232,221,0.8)] shadow-[0_2px_12px_rgba(106,58,42,0.04)] relative z-10 md:mx-auto">
                  <span className="font-heading font-bold text-brown text-sm flex flex-col items-center text-center leading-tight">
                    {milestone.year.length <= 4 ? (
                      <span className="text-[17px]">{milestone.year}</span>
                    ) : (
                      <>
                        <span className="text-[11px] text-text-muted uppercase tracking-wider">{milestone.year.split(' ')[0]}</span>
                        <span className="text-[15px]">{milestone.year.split(' ')[1]}</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Testo Descrittivo */}
                <div className="milestone-text ml-6 md:ml-0 md:mt-6 md:text-center flex-1 max-w-[220px]">
                  <p className="font-sans text-text-sec text-[15px] font-medium leading-snug">
                    {milestone.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA "Leggi tutta la storia" */}
        <div className="mt-20 md:mt-28 flex justify-center milestone-text overflow-hidden">
          <Link 
            href="/chi-sono" 
            className="inline-flex items-center font-sans font-extrabold text-orange hover:text-orange-dark hover:underline underline-offset-4 transition-all text-lg tracking-wide group"
          >
            Leggi tutta la storia 
            <span className="ml-2 font-mono font-medium group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

      </div>
    </section>
  )
}
