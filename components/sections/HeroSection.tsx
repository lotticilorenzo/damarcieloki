'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { PawPrint } from '../ui/PawPrint'
import { LokiSticker } from '../ui/LokiSticker'
import { BubbleField } from '../ui/SoapBubble'
import { ScissorsFloat } from '../ui/ScissorsFloat'
import { heroChildren } from '@/lib/animations'
import { ctaConNome } from '@/lib/utils'
import { soundManager } from '@/lib/sounds'
import { MagneticButton } from '../ui/MagneticButton'
import { ParallaxImage } from '../ui/ParallaxImage'
import { HoverImageReveal } from '../ui/HoverImageReveal'

export function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center min-h-[100dvh] pt-[120px] md:pt-[160px] pb-12 md:pb-16 overflow-hidden"
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
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.12, delayChildren: 0.2 }
                }
              }}
              className="font-heading italic font-black text-brown leading-[1.05] mb-5 w-full flex flex-wrap gap-x-2 lg:gap-x-4 overflow-hidden"
              style={{ fontSize: 'clamp(42px, 11vw, 100px)' }}
            >
              <div className="overflow-hidden flex items-end">
                <motion.span variants={{ hidden: { y: '100%', opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
                  <HoverImageReveal imageSrc="/images/hero.png" rotation={-6}>
                    <Link href="/servizi/bagno" className="hover:text-orange transition-colors">Bagnetto</Link>,
                  </HoverImageReveal>
                </motion.span>
              </div>
              <div className="overflow-hidden flex items-end">
                <motion.span variants={{ hidden: { y: '100%', opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
                  <HoverImageReveal imageSrc="/images/salon.png" rotation={4}>
                    <Link href="/servizi/taglio-forbice" className="hover:text-orange transition-colors font-medium">piega</Link>
                  </HoverImageReveal>
                </motion.span>
              </div>
              <div className="overflow-hidden flex items-end">
                <motion.span variants={{ hidden: { y: '100%', opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
                  e
                </motion.span>
              </div>
              <div className="overflow-hidden flex items-end">
                <motion.span variants={{ hidden: { y: '100%', opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
                  <HoverImageReveal imageSrc="/images/hero.png" rotation={-3}>
                    <span className="text-orange">coccole.</span>
                  </HoverImageReveal>
                </motion.span>
              </div>
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
              className="font-sans font-normal text-text-sec text-[16px] md:text-[17px] leading-[1.75] max-w-[52ch] mb-8 md:mb-10 text-balance"
            >
              Tutto nasce da un amore smisurato. Sono Marci, <span className="font-semibold text-brown">toelettatore e addestratore cinofilo a Parma</span>. Ogni cane è un'anima unica e speciale: merita dedizione, pazienza e le cure necessarie per un'esperienza senza stress, trattato con lo stesso identico amore con cui lo tratteresti tu.
            </motion.p>

            <motion.div
              variants={heroChildren.item}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full"
            >
              <Link href="/#prenota" className="outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-bg focus-visible:ring-offset-orange rounded-full w-full sm:w-auto">
                <MagneticButton className="w-full sm:w-auto z-20">
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
                </MagneticButton>
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
            className="w-full lg:w-[45%] relative aspect-[4/3] lg:aspect-square flex items-center justify-center overflow-visible rounded-[40px] shadow-2xl"
          >
            {/* Foto Principale generata da AI in ParallaxReveal mode */}
            <div className="absolute inset-0 rounded-[40px] overflow-hidden border-4 border-white shadow-inner">
              <ParallaxImage 
                src="/images/hero.png" 
                alt="Cagnolino felice alla toelettatura" 
                fill
                priority
                containerClassName="w-full h-full"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                overlayClassName="bg-gradient-to-t from-orange/10 to-transparent mix-blend-overlay"
              />
            </div>

            {/* Decorazioni SVG Fluttuanti */}
            <BubbleField />
            <ScissorsFloat 
              size="lg" 
              variant="open" 
              className="absolute top-[8%] left-[8%] opacity-90 pointer-events-none drop-shadow-md z-10" 
            />

            {/* Loki Hero Protagonista: in sovrimpressione nell'angolo */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -right-6 z-20 bg-white p-2 rounded-full shadow-xl border border-border"
            >
              <LokiSticker 
                expression="happy" 
                size="md" 
                className="drop-shadow-sm"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
