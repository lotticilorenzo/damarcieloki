'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { servizi } from '@/data/services'
import { ServiceCard } from '../ui/ServiceCard'
import { PeekabooElement } from '../ui/PeekabooElement'
import { LokiSticker } from '../ui/LokiSticker'

export function ServicesSection() {
  return (
    <section className="py-16 md:py-36 bg-bg relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 z-10 relative">
        
        {/* Sezione titolo Testata */}
        <div className="flex flex-col items-start mb-12 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-black text-brown py-1 text-[clamp(32px,8vw,52px)] leading-tight mb-4"
          >
            Cosa fa Marci
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-text-sec text-[18px] md:text-[20px] max-w-[48ch] leading-relaxed"
          >
            Amore vero, bolle profumate e zero stress. Perché ogni cane è unico, e noi lo sappiamo bene. 🐾
          </motion.p>
        </div>

        {/* Griglia Organica Bento */}
        {/* Griglia Standard Bilanciata (3 sopra, 2 sotto centrati al volo o semplicemente fluidi) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          
          <div className="col-span-1">
            <ServiceCard servizio={servizi[0]} index={0} className="w-full h-full" />
          </div>
          
          <div className="col-span-1">
            <ServiceCard servizio={servizi[1]} index={1} className="w-full h-full" />
          </div>

          <div className="col-span-1">
            <ServiceCard servizio={servizi[2]} index={2} className="w-full h-full" />
          </div>

          <div className="col-span-1 lg:col-start-1 lg:translate-x-1/2">
             <ServiceCard servizio={servizi[3]} index={3} className="w-full h-full" />
          </div>

          <div className="col-span-1 lg:col-start-2 lg:translate-x-1/2">
             <ServiceCard servizio={servizi[4]} index={4} className="w-full h-full" />
          </div>

        </div>

      </div>
    </section>
  )
}

