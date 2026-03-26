'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { LokiSticker } from './LokiSticker'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isReduced, setIsReduced] = useState(false)
  const [showOverlay, setShowOverlay] = useState(true)

  // Gestione sicura per SSR (matchMedia esiste solo su Window)
  useEffect(() => {
    setIsReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  // Innesca l'overlay ad ogni cambio pagina
  useEffect(() => {
    setShowOverlay(true)
    
    // Mostriamo la transizione per 1.8 secondi poi la facciamo sparire
    const t = setTimeout(() => {
      setShowOverlay(false)
    }, 1800)
    
    return () => clearTimeout(t)
  }, [pathname])

  if (isReduced) {
    return <>{children}</>
  }

  return (
    <>
      {/* OVERLAY DI TRANSIZIONE (Global) */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
            className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center"
          >
            <div className="relative">
              {/* Il cagnolino spunta da dietro al logo */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: -80, opacity: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 15 }}
                className="absolute left-1/2 -translate-x-1/2 top-0 -z-10"
              >
                <LokiSticker expression="curious" size="lg" />
              </motion.div>
              
              {/* Il logo quadrato */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-[220px] h-[220px] md:w-[320px] md:h-[320px]"
              >
                <Image 
                  src="/logo_damarcieloki.jpeg" 
                  alt="Da Marci & Loki - Toelettatura" 
                  fill 
                  className="object-contain" 
                  priority 
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENUTO DELLA PAGINA */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
          className="flex-grow flex flex-col w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

