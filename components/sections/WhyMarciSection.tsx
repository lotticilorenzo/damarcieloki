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
    title: "Li capisco al volo. Davvero.",
    text: "Non faccio solo il bagnetto: sono addestratore cinofilo certificato. I cani paurosi o vivaci non mi spaventano, anzi: le sfide sono la mia passione!"
  },
  {
    icon: Dog,
    title: "Zero stress, 100% attenzioni.",
    text: "Niente code d'attesa o gabbie rumorose. Quando entra il tuo cane, chiudo la porta: il salone è esclusivamente per lui finché non è bellissimo."
  },
  {
    icon: Scissors,
    title: "Il risultato prima dell'orologio.",
    text: "Lavoro senza il fiato sul collo. Mi prendo esattamente il tempo che serve per non stressarlo e farti uscire con un risultato impeccabile."
  }
]

// SplitTitle rimosso per permettere un allineamento a card perfetto senza glitch di flexbox

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

      // 2. Entrata dal basso dei titoli
      gsap.from('.usp-title', { 
        y: 20, 
        opacity: 0, 
        stagger: 0.15, 
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
    <section ref={sectionRef} className="py-16 md:py-36 bg-brown text-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Titolo Sezione Testata */}
        <div className="mb-14 md:mb-28 flex justify-center text-center">
          <h2 className="font-heading font-extrabold text-white text-[clamp(32px,8vw,44px)] tracking-tight">
            Perché scegliere me
          </h2>
        </div>

        {/* 3 USP Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-24">
          {usps.map((usp, index) => {
            const Icon = usp.icon
            
            return (
              <div key={index} className="flex flex-col items-start text-left bg-white/[0.04] border border-white/10 backdrop-blur-md rounded-[32px] p-8 md:p-10 shadow-2xl hover:bg-white/[0.08] transition-colors duration-500">
                
                {/* Highlight Container Icona */}
                <div className="usp-icon w-[64px] h-[64px] md:w-[88px] md:h-[88px] rounded-[20px] md:rounded-[24px] bg-orange flex items-center justify-center mb-6 md:mb-8 shadow-[0_16px_40px_rgba(212,88,26,0.35)] shrink-0">
                  <Icon size={32} weight="duotone" className="text-white md:w-10 md:h-10" />
                </div>
                
                <h3 className="usp-title font-heading font-extrabold text-[22px] md:text-[26px] text-white leading-snug mb-4 w-full">
                  {usp.title}
                </h3>
                
                <p className="usp-body font-sans text-[rgba(255,255,255,0.75)] text-[16px] md:text-[17px] font-normal leading-relaxed text-balance">
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
