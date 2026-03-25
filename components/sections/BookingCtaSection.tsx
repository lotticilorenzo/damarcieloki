'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LokiSticker } from '../ui/LokiSticker'
import { BookingForm } from '../forms/BookingForm'
import { whatsappLink } from '@/lib/utils'
import { PeekabooElement } from '../ui/PeekabooElement'

// Sub-componentino per generare bolle galleggianti
const CtaBubble = ({ duration, dx, dy, className }: { duration: string, dx: string, dy: string, className: string }) => (
  <div 
    className={`absolute rounded-full bg-[rgba(255,255,255,0.06)] shadow-[inset_0_0_40px_rgba(255,255,255,0.03)] filter blur-[2px] ${className}`} 
    style={{
      animation: `cta-float ${duration} ease-in-out infinite alternate`,
      '--dx': dx,
      '--dy': dy
    } as React.CSSProperties} 
    aria-hidden="true"
  />
)

export function BookingCtaSection() {
  return (
    <section id="prenota" className="relative py-24 md:py-32 bg-orange overflow-hidden border-t-[6px] border-orange-dark">
      
      {/* Sfondo Astratto Bolle Ipnotiche */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <CtaBubble className="w-[400px] h-[400px] -left-[150px] -top-[150px]" duration="12s" dx="40px" dy="60px" />
        <CtaBubble className="w-[600px] h-[600px] -right-[200px] -bottom-[200px]" duration="18s" dx="-60px" dy="-40px" />
        <CtaBubble className="w-[250px] h-[250px] left-[35%] top-[15%]" duration="14s" dx="35px" dy="-40px" />
        <CtaBubble className="w-[400px] h-[400px] right-[15%] top-[5%]" duration="20s" dx="-50px" dy="50px" />
      </div>

      {/* Peekaboo Loki (spunta dall'alto del Box Form durante lo scroll) */}
      <PeekabooElement 
        yStart={80} 
        yEnd={-40} 
        start="top 90%"
        end="bottom 20%"
        className="hidden lg:block right-[8%] -top-[160px] z-10"
      >
        <LokiSticker expression="happy" size="lg" className="rotate-[-12deg] drop-shadow-2xl" />
      </PeekabooElement>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 w-full flex-grow">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-16 lg:gap-20">
          
          {/* LATO SINISTRO: Hook Emotivo e Copy */}
          <div className="w-full lg:w-[48%] flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
            
            {/* Badge Loki Approva */}
            <div className="mb-8 inline-flex items-center gap-3 bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.25)] rounded-full pr-5 pl-[6px] py-[6px] shadow-sm backdrop-blur-md">
              <LokiSticker expression="approves" size="sm" />
              <span className="font-sans text-[14px] md:text-[15px] font-bold text-white tracking-widest uppercase mt-[2px] drop-shadow-sm">
                Loki approva ✓
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-white text-[clamp(36px,5vw,52px)] leading-[1.05] tracking-tight mb-5 text-balance drop-shadow-sm">
              Il tuo cane merita una giornata da VIP. <span className="font-sans whitespace-nowrap pl-1" aria-hidden="true">🐾</span>
            </h2>

            <p className="font-sans text-[rgba(255,255,255,0.92)] text-[20px] font-medium mb-12 max-w-[40ch] text-balance">
              Scrivimi — parliamo del tuo bestione.
            </p>

            {/* Pulsante Secondario diretto WhatsApp */}
            <motion.a 
              href={whatsappLink("Ciao Marci! Vorrei prenotare subito una toelettatura 🐾.")} 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: '#FFF5EC', // bg-alt
                transition: { type: 'spring' as const, stiffness: 400, damping: 17 }
              }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center bg-white text-orange rounded-full px-[36px] py-[16px] font-sans font-extrabold text-[18px] tracking-wide outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-orange shadow-[0_12px_40px_rgba(107,58,42,0.25)] transition-shadow"
            >
              Scrivimi su WhatsApp
            </motion.a>

          </div>

          {/* LATO DESTRO: Integrazione Form */}
          <div className="w-full lg:w-[52%] max-w-[540px] lg:max-w-none flex justify-center">
            <BookingForm />
          </div>

        </div>
      </div>
    </section>
  )
}
