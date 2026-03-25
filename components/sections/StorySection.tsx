'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { PawPrint } from '../ui/PawPrint'
import { cn } from '@/lib/utils'
import { ParallaxImage } from '../ui/ParallaxImage'

const milestones = [
  { year: '2009', title: 'Il primo cane entra in casa', text: 'E non esce più dal cuore. Nasce l\'amore incondizionato per i cani.' },
  { year: '2023', title: 'Inizio corso addestratore', text: 'Decido di trasformare una passione nello studio approfondito del comportamento cinofilo.' },
  { year: '2025', title: 'Diploma certificato', text: 'Addestratore ENCI ufficialmente diplomato. Inizio a capire davvero il cane a 360°.' },
  { year: 'gen 2026', title: 'Corso di toelettatura', text: 'Unisco la conoscenza comportamentale alla cura del pelo. Un approccio diverso.' },
  { year: 'giu 2026', title: 'Apre Da Marci & Loki', text: 'A Parma. Non un semplice lavaggio, ma un posto dove ogni cane è compreso.' },
]

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return
    
    const ctx = gsap.context(() => {
      // Linea centrale animata
      gsap.from('.timeline-line-vert', { 
        scaleY: 0, 
        transformOrigin: 'top center', 
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 1
        }
      })

      // Nodi testuali
      gsap.utils.toArray('.milestone-wrap').forEach((node: any, i) => {
        gsap.from(node, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 85%',
          }
        })
      })

      // Nodi cerchi (pallini)
      gsap.utils.toArray('.milestone-dot').forEach((dot: any) => {
        gsap.from(dot, {
          scale: 0,
          duration: 0.6,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: dot,
            start: 'top 85%',
          }
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-36 bg-bg-alt overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <h2 className="font-heading font-extrabold text-brown text-[clamp(32px,5vw,48px)] mb-5">
            Come sono arrivato qui
          </h2>
          <p className="font-sans text-text-sec text-[18px] md:text-[20px] max-w-[50ch] text-balance leading-relaxed">
            Dal primo cane salvato al salone di oggi. Un percorso fatto di studio e tanto cuore.
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto mb-24 md:mb-32 rounded-[32px] overflow-hidden shadow-2xl border-[6px] border-white aspect-video relative group">
          <ParallaxImage 
            src="/images/salon.png" 
            alt="Interno del salone toelettatura Da Marci e Loki a Parma" 
            fill 
            className="object-cover transition-transform duration-1000 group-hover:scale-105" 
            overlayClassName="bg-gradient-to-t from-brown/30 to-transparent"
          />
        </div>

        {/* TIMELINE VERTICALE ZIG ZAG */}
        <div className="relative w-full max-w-5xl mx-auto timeline-container pb-12">
          
          {/* Linea continua centrale */}
          <div className="absolute top-0 bottom-0 left-[24px] md:left-1/2 md:-ml-[2px] w-[4px] bg-border timeline-line-vert rounded-full overflow-hidden">
            <div className="w-full h-full bg-orange origin-top scale-y-100 opacity-60"></div>
          </div>

          <div className="flex flex-col gap-12 md:gap-20 relative">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0
              return (
                <div key={index} className="flex relative w-full milestone-wrap items-center">
                  
                  {/* Spazio Vuoto Desktop */}
                  <div className={cn("hidden md:block w-1/2 pr-12", isEven ? "order-1 text-right" : "order-3 pl-12 text-left")}>
                    {isEven ? (
                      <div>
                        <span className="font-mono text-orange text-xl font-bold tracking-widest block mb-2">{milestone.year}</span>
                        <h3 className="font-heading text-brown text-2xl font-black mb-3">{milestone.title}</h3>
                        <p className="font-sans text-text-sec text-lg leading-relaxed text-balance ml-auto max-w-[36ch]">{milestone.text}</p>
                      </div>
                    ) : (
                      <div>
                        <span className="font-mono text-orange text-xl font-bold tracking-widest block mb-2">{milestone.year}</span>
                        <h3 className="font-heading text-brown text-2xl font-black mb-3">{milestone.title}</h3>
                        <p className="font-sans text-text-sec text-lg leading-relaxed text-balance max-w-[36ch]">{milestone.text}</p>
                      </div>
                    )}
                  </div>

                  {/* Nodo Centrale */}
                  <div className="absolute left-[24px] md:left-1/2 -ml-[18px] md:-ml-[28px] z-10 flex flex-col items-center milestone-dot">
                    <div className="w-[40px] h-[40px] md:w-[56px] md:h-[56px] bg-white border-[4px] border-orange rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,88,26,0.3)]">
                      <PawPrint size="xs" className="text-orange" />
                    </div>
                  </div>

                  {/* Contenuto Mobile */}
                  <div className="md:hidden ml-[72px] w-full pt-1">
                    <span className="font-mono text-orange text-sm font-bold tracking-widest block mb-1">{milestone.year}</span>
                    <h3 className="font-heading text-brown text-[20px] font-black mb-2">{milestone.title}</h3>
                    <p className="font-sans text-text-sec text-[15px] leading-relaxed">{milestone.text}</p>
                  </div>

                </div>
              )
            })}
          </div>

        </div>
        
      </div>
    </section>
  )
}
