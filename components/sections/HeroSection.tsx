'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { PawPrint } from '../ui/PawPrint'
import { LokiSticker } from '../ui/LokiSticker'
import { BubbleField } from '../ui/SoapBubble'
import { ScissorsFloat } from '../ui/ScissorsFloat'
import { heroChildren } from '@/lib/animations'
import { ctaConNome } from '@/lib/utils'
import { soundManager } from '@/lib/sounds'

export function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center min-h-[100dvh] pt-24 pb-16 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 75% 20%, rgba(212,88,26,0.10) 0%, transparent 55%),
          radial-gradient(ellipse at 20% 80%, rgba(42,122,123,0.08) 0%, transparent 50%),
          var(--bg)
        `
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full z-10">
        {/* Entry Stagger della composizione totale */}
        <motion.div
          variants={heroChildren.container}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8"
        >
          {/* LATO SINISTRO (55%) */}
          <div className="w-full lg:w-[55%] flex flex-col items-start lg:pr-6">
            <motion.span
              variants={heroChildren.item}
              className="font-sans font-semibold text-orange uppercase tracking-[0.10em] text-[12px] mb-4"
            >
              TOELETTATURA PARMA
            </motion.span>
            
            <motion.h1
              variants={heroChildren.item}
              className="font-heading italic font-black text-brown leading-[1.05] mb-5 w-full"
              style={{ fontSize: 'clamp(52px, 9vw, 100px)' }}
            >
              <Link href="/servizi/bagno" className="hover:text-orange transition-colors">Bagnetto</Link>, <Link href="/servizi/taglio-forbice" className="hover:text-orange transition-colors font-medium">piega</Link> e <span className="text-orange">coccole.</span>
            </motion.h1>

            <motion.h2
              variants={heroChildren.item}
              className="font-heading font-extrabold text-text-sec leading-snug mb-5 text-balance"
              style={{ fontSize: 'clamp(20px, 3vw, 28px)' }}
            >
              Il tuo cane lo merita davvero.
            </motion.h2>

            <motion.p
              variants={heroChildren.item}
              className="font-sans font-normal text-text-sec text-[16px] md:text-[17px] leading-[1.75] max-w-[52ch] mb-10 text-balance"
            >
              Sono Marci, <span className="font-semibold text-brown">toelettatore di cani a Parma</span>. 
              <Link href="/chi-sono" className="hover:underline underline-offset-4 decoration-orange/40 transition-all">Addestratore cinofilo</Link> e appassionato: ogni cane è diverso e merita il tempo necessario per sentirsi a proprio agio, proprio come se fossi io a prendermene cura.
            </motion.p>

            <motion.div
              variants={heroChildren.item}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full"
            >
              <Link href="/#prenota" className="outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-bg focus-visible:ring-offset-orange rounded-full w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.04, backgroundColor: '#A83F0E' }}
                  whileTap={{ scale: 0.96 }}
                  onMouseEnter={() => soundManager.playPop()}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange text-white rounded-full px-8 py-4 font-sans font-semibold text-lg shadow-[0_8px_20px_rgba(212,88,26,0.25)]"
                >
                  <span>{ctaConNome()}</span>
                  <PawPrint size="xs" className="opacity-100! text-white" style={{ color: '#FFFDF8' }} />
                </motion.div>
              </Link>

              <Link href="/servizi" className="outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-bg focus-visible:ring-offset-teal rounded-full w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.04, backgroundColor: 'rgba(42,122,123,0.08)' }}
                  whileTap={{ scale: 0.96 }}
                  onMouseEnter={() => soundManager.playPop()}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="w-full sm:w-auto flex items-center justify-center border-2 border-teal text-teal rounded-full px-8 py-4 font-sans font-semibold text-lg"
                >
                  Scopri i servizi
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* LATO DESTRO (45%) */}
          <motion.div
            variants={heroChildren.item}
            className="w-full lg:w-[45%] relative aspect-[4/3] lg:aspect-square flex items-center justify-center overflow-hidden rounded-[40px]"
          >
            {/* Composizione Background */}
            <BubbleField />

            {/* Decorazioni SVG Fluttuanti */}
            <ScissorsFloat 
              size="lg" 
              variant="open" 
              className="absolute top-[15%] left-[15%] opacity-60 pointer-events-none" 
            />
            
            <ScissorsFloat 
              size="sm" 
              variant="closed" 
              className="absolute bottom-[20%] left-[15%] opacity-80 pointer-events-none z-20" 
            />

            {/* Loki Hero Protagonista: Floating +14px accentuato */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10"
            >
              <LokiSticker 
                expression="happy" 
                size="lg" 
                className="drop-shadow-[0_20px_48px_rgba(212,88,26,0.18)]"
                fetchPriority="high"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
