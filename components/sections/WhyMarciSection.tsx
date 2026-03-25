'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'
import { GraduationCap } from '@phosphor-icons/react/dist/ssr/GraduationCap'
import { Dog } from '@phosphor-icons/react/dist/ssr/Dog'
import { Scissors } from '@phosphor-icons/react/dist/ssr/Scissors'

const usps = [
  {
    icon: GraduationCap,
    title: "Capisco i cani. Davvero.",
    text: <>Ho il <Link href="/chi-sono" className="underline decoration-orange/30 hover:decoration-orange transition-all">diploma di addestratore cinofilo</Link>. I cani difficili non mi spaventano, anzi, sono i miei preferiti.</>
  },
  {
    icon: Dog,
    title: "Un salone piccolo, tutta l'attenzione.",
    text: "Nessuna fila. Nessuno stress. Il tuo cane ha la mia attenzione completa per tutta la sessione."
  },
  {
    icon: Scissors,
    title: "Ogni pelo ha il suo tempo.",
    text: "Non taglio di fretta. Il risultato si vede e si vede ancora meglio la volta dopo."
  }
]

// Componente helper per iniettare span isolati su ogni parola del titolo.
// Genera l'idale setup DOM per l'animazione GSAP 'SplitText-like' manuale.
const SplitTitle = ({ text }: { text: string }) => (
  <span className="inline-flex flex-wrap items-end" style={{ gap: '0.22em' }}>
    {text.split(' ').map((word, i) => (
      <span key={i} className="overflow-hidden inline-flex pb-[4px]">
        <span className="usp-word inline-block origin-bottom">{word}</span>
      </span>
    ))}
  </span>
)

export function WhyMarciSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)
    
    // Fallback sicuro per l'accessibilità: se l'utente richiede di non avere moti visivi, l'animazione va ignorata.
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isReduced) return

    const ctx = gsap.context(() => {
      // 1. Entrata a molla/rimbalzo delle icone arancioni
      gsap.from('.usp-icon', { 
        scale: 0, 
        opacity: 0, 
        stagger: 0.2, 
        ease: 'back.out(2)', 
        duration: 0.7,
        scrollTrigger: { 
          trigger: sectionRef.current, 
          start: 'top 70%', 
          once: true 
        } 
      })

      // 2. Rivelazione lettera da maschera per ciascuna parola dell'H3
      gsap.from('.usp-word', { 
        yPercent: 105, 
        opacity: 0, 
        stagger: 0.035, 
        ease: 'power3.out', 
        duration: 0.6, 
        scrollTrigger: { 
          trigger: sectionRef.current, 
          start: 'top 65%', 
          once: true 
        } 
      })
      
      // 3. Dissolvenza lineare verso l'alto per i body text successivi (così cadono in sequenza)
      gsap.from('.usp-body', {
        opacity: 0,
        y: 16,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          once: true
        }
      })
    }, sectionRef)

    // GSAP memory leak prevention
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-36 bg-brown text-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Titolo Sezione Testata */}
        <div className="mb-20 md:mb-28 flex justify-center text-center">
          <h2 className="font-heading font-extrabold text-white text-[clamp(32px,5vw,44px)] tracking-tight">
            Perché scegliere me
          </h2>
        </div>

        {/* 3 USP Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-16 lg:gap-24">
          {usps.map((usp, index) => {
            const Icon = usp.icon
            
            return (
              <div key={index} className="flex flex-col items-start md:items-center md:text-center">
                
                {/* Highlight Container Icona */}
                <div className="usp-icon w-[88px] h-[88px] rounded-3xl bg-orange flex items-center justify-center mb-8 shadow-[0_16px_40px_rgba(212,88,26,0.35)] shrink-0">
                  <Icon size={44} weight="duotone" className="text-white" />
                </div>
                
                {/* H3 Analizzato e spezzato per GSAP */}
                <h3 className="font-heading font-extrabold text-[24px] md:text-[26px] text-white leading-snug mb-5 w-full">
                  <SplitTitle text={usp.title} />
                </h3>
                
                {/* Copia Body */}
                <p className="usp-body font-sans text-[rgba(255,255,255,0.85)] text-[16px] md:text-[17px] font-normal leading-relaxed max-w-[38ch] text-balance">
                  {usp.text}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
