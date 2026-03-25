'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PawPrint } from '../ui/PawPrint'
import { LokiSticker } from '../ui/LokiSticker'
import { cn } from '@/lib/utils'

interface Testimonial {
  id: string
  text: string
  owner: string
  dog: string
  breed: string
  stars: number
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    text: "Portato Baffo per la prima volta, è tornato a casa così bello che non lo riconoscevo.",
    owner: "Laura M.",
    dog: "Baffo",
    breed: "Schnauzer 4 anni",
    stars: 5
  },
  {
    id: '2',
    text: "Finalmente un toelettatore che capisce i cani ansiosi. Birba non si è stressata.",
    owner: "Stefano R.",
    dog: "Birba",
    breed: "Barboncino toy 2 anni",
    stars: 5
  },
  {
    id: '3',
    text: "Lo stripping fatto da Marci è una cosa seria. Il pelo di Kira non era mai stato così.",
    owner: "Giulia P.",
    dog: "Kira",
    breed: "Fox Terrier 5 anni",
    stars: 5
  },
  {
    id: '4',
    text: "Cane difficile, molto difficile. Marci l'ha gestito con una calma che non avevo mai visto.",
    owner: "Andrea T.",
    dog: "Rocky",
    breed: "Pastore Tedesco 3 anni",
    stars: 5
  }
]

const Star = ({ active, index }: { active: boolean, index: number }) => (
  <svg 
    width="18" height="18" viewBox="0 0 24 24" fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="overflow-visible"
  >
    <path 
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
      stroke="#D4581A" 
      strokeWidth="2"
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <motion.path 
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
      fill="#D4581A"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{ 
        delay: 0.2 + index * 0.1, 
        duration: 0.4, 
        ease: "easeOut" 
      }}
    />
  </svg>
)

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <motion.div 
    layout
    className="bg-white rounded-[24px] p-8 shadow-[0_12px_32px_rgba(106,58,42,0.06)] border border-border flex flex-col h-full relative group"
  >
    <PawPrint size="sm" className="absolute top-6 left-6 opacity-5 rotate-[-15deg] pointer-events-none" />
    
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <Star key={i} index={i} active={i < testimonial.stars} />
      ))}
    </div>

    <blockquote className="font-heading italic font-bold text-brown text-[18px] md:text-[20px] leading-relaxed mb-6 flex-grow">
      &ldquo;{testimonial.text}&rdquo;
    </blockquote>

    <div className="w-full h-[1px] bg-border mb-6" />

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-orange-light flex items-center justify-center text-orange font-heading font-extrabold text-xl shadow-sm border border-orange/10">
          {testimonial.dog[0]}
        </div>
        <div className="flex flex-col">
          <span className="font-sans font-bold text-text text-[15px]">{testimonial.owner}</span>
          <span className="font-sans font-medium text-teal text-[13px]">{testimonial.dog}, {testimonial.breed}</span>
        </div>
      </div>
      <LokiSticker expression="approves" size="sm" className="opacity-90 grayscale group-hover:grayscale-0 transition-all duration-500 scale-75 origin-right" />
    </div>
  </motion.div>
)

export function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState(0)

  const next = useCallback(() => {
    setDirection(1)
    setIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next, isPaused])

  // Calcolo delle card visibili
  const visibleTestimonials = [
    testimonials[index],
    testimonials[(index + 1) % testimonials.length],
    testimonials[(index + 2) % testimonials.length],
  ]

  return (
    <section className="py-24 md:py-32 bg-bg overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col gap-4">
            <span className="font-sans font-bold text-teal uppercase tracking-[0.15em] text-[12px]">
              Dicono di Marci & Loki
            </span>
            <h2 className="font-heading font-black text-brown text-[42px] md:text-[52px] leading-[1.1]">
              Cani felici, <br className="hidden md:block" />
              proprietari <span className="text-orange italic">tranquilli.</span>
            </h2>
          </div>

          {/* Navigazione */}
          <div className="flex items-center gap-4">
            <button 
              onClick={prev}
              className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-brown hover:border-orange hover:text-orange transition-all outline-none focus-visible:ring-2 focus-visible:ring-orange group"
              aria-label="Recensione precedente"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-active:-translate-x-1 transition-transform">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={next}
              className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-brown hover:border-orange hover:text-orange transition-all outline-none focus-visible:ring-2 focus-visible:ring-orange group"
              aria-label="Prossima recensione"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-active:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div 
          className="relative min-h-[400px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout" initial={false}>
              {/* Su mobile mostriamo solo la prima della lista visibile */}
              <div className="md:hidden contents">
                <motion.div
                  key={visibleTestimonials[0].id}
                  initial={{ x: direction * 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -direction * 50, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TestimonialCard testimonial={visibleTestimonials[0]} />
                </motion.div>
              </div>

              {/* Su desktop mostriamo le 3 card con animazione layout */}
              <div className="hidden md:contents">
                {visibleTestimonials.map((t) => (
                  <motion.div
                    key={t.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <TestimonialCard testimonial={t} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1)
                setIndex(i)
              }}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-8 bg-orange" : "w-2 bg-border hover:bg-orange/40"
              )}
              aria-label={`Vai alla recensione ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
