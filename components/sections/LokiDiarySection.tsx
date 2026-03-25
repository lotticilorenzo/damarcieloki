'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LokiSticker } from '../ui/LokiSticker'
import { LokiExpression } from '@/types'
import { cn } from '@/lib/utils'

interface DiaryEntry {
  id: string
  title: string
  expression: LokiExpression
  text: string
  rotation: number
  mobileRotation: number
}

const entries: DiaryEntry[] = [
  {
    id: '1',
    title: 'Amico Spettinato',
    expression: 'approves',
    text: "Oggi è arrivato uno Schnauzer con un pelo... come dire... interessante. Marci ci ha lavorato due ore. Risultato: spettacolare. Voto Loki: 10/10 avrei abbaiato di gioia.",
    rotation: -1.5,
    mobileRotation: -0.8
  },
  {
    id: '2',
    title: 'Il Gigante Buono',
    expression: 'curious',
    text: "Un Pastore Tedesco. Grosso. Molto grosso. Io ho fatto finta di dormire per tutta la sessione. Marci non si è spaventato. Io un po' sì.",
    rotation: 0.8,
    mobileRotation: 0.4
  },
  {
    id: '3',
    title: 'Fiocco, il mio amore',
    expression: 'happy',
    text: "Barboncina di nome Fiocco. La più bella che sia mai venuta qui. Dico questo in modo completamente obiettivo e senza conflitti di interesse.",
    rotation: -0.5,
    mobileRotation: -0.2
  }
]

const DiaryPostIt = ({ entry, index }: { entry: DiaryEntry, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, rotate: entry.rotation * 2 }}
    whileInView={{ opacity: 1, y: 0, rotate: entry.rotation }}
    viewport={{ once: true }}
    whileHover={{ 
      scale: 1.02, 
      rotate: 0, 
      zIndex: 10,
      boxShadow: '0 20px 40px rgba(106,58,42,0.12)'
    }}
    transition={{ 
      delay: index * 0.15, 
      type: 'spring', 
      stiffness: 260, 
      damping: 20 
    }}
    className={cn(
      "relative bg-[#FFF9E6] p-8 pb-10 shadow-[0_8px_24px_rgba(106,58,42,0.06)] border-l-[4px] border-orange min-h-[280px] flex flex-col justify-between group overflow-hidden"
    )}
    style={{ 
      borderRadius: '4px 24px 4px 4px',
    }}
  >
    {/* Logica Angolo Piegato */}
    <div 
      className="absolute bottom-0 right-0 w-10 h-10 bg-[#EFD9A0] z-20"
      style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
    />
    <div 
      className="absolute bottom-10 right-0 w-0 h-0 border-t-[10px] border-t-transparent border-l-[10px] border-l-transparent border-r-[10px] border-r-white border-b-[10px] border-b-white opacity-10"
    />
    {/* Contenuto post-it */}
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className="font-heading italic font-bold text-orange text-[16px] tracking-wide">
          {entry.title}
        </span>
        <div className="bg-white/40 p-1.5 rounded-full scale-90">
             <LokiSticker expression={entry.expression} size="sm" className="opacity-100" />
        </div>
      </div>
      
      <p className="font-sans text-text text-[17px] leading-[1.6]">
        {entry.text}
      </p>
    </div>

    {/* Firma stilizzata */}
    <div className="mt-8 flex items-center gap-2 self-end opacity-40 group-hover:opacity-100 transition-opacity">
       <span className="font-heading italic font-extrabold text-brown text-[14px]">
         — Loki
       </span>
    </div>

  </motion.div>
)

export function LokiDiarySection() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
          <div className="absolute top-10 right-20 rotate-12">
               <LokiSticker expression="curious" size="lg" />
          </div>
          <div className="absolute bottom-10 left-10 -rotate-6">
               <LokiSticker expression="happy" size="lg" />
          </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-20">
          <h2 className="font-heading font-black italic text-brown text-[42px] md:text-[52px] mb-4">
            Il diario di Loki
          </h2>
          <p className="font-sans italic text-text-sec text-[20px] max-w-[40ch] mx-auto">
            Ispettore di qualità ufficiale. <span className="text-orange font-bold">Giudice severo.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {entries.map((entry, i) => (
            <DiaryPostIt key={entry.id} entry={entry} index={i} />
          ))}
        </div>

        <div className="mt-20 text-center">
            <p className="font-heading italic text-brown/40 text-[13px]">
                Nessun barboncino è stato corrotto per scrivere queste recensioni.
            </p>
        </div>

      </div>
    </section>
  )
}
