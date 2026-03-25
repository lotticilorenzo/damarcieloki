'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const galleryImages = [
  { src: '/images/salon.png', title: 'Il Salone, dove tutto inizia' },
  { src: '/images/hero.png', title: 'Bagnetto Relax' },
  { src: '/images/salon.png', title: 'Attrezzatura Premium' },
  { src: '/images/hero.png', title: 'Gioia e Pulizia' },
  { src: '/images/salon.png', title: 'Risultato Finale' }
]

export function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)
    
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    const ctx = gsap.context(() => {
      const container = wrapperRef.current
      if (!container) return

      // GSAP Pinning: Blocchiamo la sezione verticale e "stropicciamo" orizzontalmente
      gsap.to(container, {
        x: () => -(container.scrollWidth - document.documentElement.clientWidth) + "px",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1, // Fluidità
          invalidateOnRefresh: true,
          // La durata dello scroll pin è proporzionale all'ampiezza degli elementi:
          end: () => "+=" + (container.scrollWidth - document.documentElement.clientWidth)
        }
      })
      
      // Reveal opacità titolo
      gsap.from('.gallery-title', {
        opacity: 0,
        y: 30,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="h-[100dvh] bg-bg flex flex-col justify-center overflow-hidden relative border-y-2 border-border/50">
      
      <div className="absolute top-[8vh] left-6 md:left-12 z-10 gallery-title">
        <h2 className="font-heading font-black text-brown text-[clamp(36px,5vw,52px)]">
          Un assaggio di noi
        </h2>
        <p className="font-sans text-text-sec text-lg font-medium">Scorri verso il basso per continuare...</p>
      </div>

      {/* Wrapper Esteso Orizzontalmente */}
      <div ref={wrapperRef} className="flex gap-6 md:gap-12 px-6 md:px-12 w-max items-center h-[60vh] mt-[5vh]">
        {galleryImages.map((img, i) => (
          <div 
            key={i} 
            className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-full shrink-0 rounded-[40px] overflow-hidden shadow-2xl border-[6px] border-white group"
          >
            <Image 
              src={img.src} 
              alt={img.title} 
              fill 
              className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" 
            />
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brown/70 via-brown/10 to-transparent flex items-end p-8 md:p-12 opacity-90 transition-opacity group-hover:opacity-100">
              <span className="font-heading font-bold text-white text-2xl md:text-3xl drop-shadow-md translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {img.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
