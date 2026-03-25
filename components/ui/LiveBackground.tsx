'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PawPrint, PawColor } from './PawPrint'

export function LiveBackground() {
  const [hydration, setHydration] = useState(false)
  const [paws, setPaws] = useState<any[]>([])
  
  useEffect(() => {
    // Generiamo l'array solo lato client per evitare hydration errors
    const generatedPaws = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // %
      size: Math.random() * 20 + 20, // 20px a 40px
      delay: Math.random() * 10,
      duration: Math.random() * 20 + 30, // 30-50s per attraversare lo schermo, fluttuazione lenta
      // Opacità tarata per essere visibile ma molto elegante (0.15 a 0.25)
      // Nota: PawPrint ha già una sua /50 opacity interna, quindi l'effetto finale è dimezzato.
      opacity: Math.random() * 0.15 + 0.10, 
      color: Math.random() > 0.5 ? 'orange' : 'teal' as PawColor
    }))
    
    setPaws(generatedPaws)
    setHydration(true)
  }, [])

  if (!hydration) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Sfumatura morbida dal centro verso l'esterno per garantire massima leggibilità del testo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,253,248,0.75)_0%,rgba(255,253,248,0.1)_100%)] z-10 mix-blend-overlay"></div>
      
      <AnimatePresence>
        {paws.map((paw) => (
          <motion.div
            key={paw.id}
            initial={{ y: '110vh', x: `${paw.left}vw`, opacity: 0, rotate: paw.left > 50 ? 5 : -5 }}
            animate={{ 
              y: '-10vh', 
              opacity: [0, paw.opacity, paw.opacity, 0],
              rotate: paw.left > 50 ? [5, -20, 5] : [-5, 20, -5] 
            }}
            transition={{
              y: { duration: paw.duration, repeat: Infinity, ease: 'linear', delay: paw.delay },
              opacity: { duration: paw.duration, repeat: Infinity, ease: 'linear', delay: paw.delay, times: [0, 0.2, 0.8, 1] },
              rotate: { duration: paw.duration / 2, repeat: Infinity, ease: 'easeInOut', delay: paw.delay }
            }}
            className="absolute bottom-0 will-change-transform"
            style={{ left: `${paw.left}%` }}
          >
            <PawPrint color={paw.color} size="xs" style={{ width: paw.size, height: paw.size }} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
