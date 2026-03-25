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
      left: Math.random() * 95, // %
      size: Math.random() * 20 + 20, // 20px a 40px
      delay: Math.random() * 5, // partono più in fretta
      duration: Math.random() * 15 + 20, // 20-35s attraversa lo schermo
      // Opacità alta per visibilità immediata e testing
      opacity: Math.random() * 0.20 + 0.30, 
      color: Math.random() > 0.5 ? 'orange' : 'teal' as PawColor
    }))
    
    setPaws(generatedPaws)
    setHydration(true)
  }, [])

  if (!hydration) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden">
      {/* Sfondo trasparente pulito: le zampine volano magicamente sopra l'intera app */}
      
      <AnimatePresence>
        {paws.map((paw) => (
          <motion.div
            key={paw.id}
            initial={{ y: '10vh', opacity: 0, rotate: paw.left > 50 ? 5 : -5 }}
            animate={{ 
              y: '-110vh', // Sale fino oltre il top dello schermo
              opacity: [0, paw.opacity, paw.opacity, 0],
              rotate: paw.left > 50 ? [5, -20, 5] : [-5, 20, -5] 
            }}
            transition={{
              y: { duration: paw.duration, repeat: Infinity, ease: 'linear', delay: paw.delay },
              opacity: { duration: paw.duration, repeat: Infinity, ease: 'linear', delay: paw.delay, times: [0, 0.1, 0.9, 1] },
              rotate: { duration: paw.duration / 2, repeat: Infinity, ease: 'easeInOut', delay: paw.delay }
            }}
            // Usiamo fixed o absolute bottom-0 ma con left fisso
            className="absolute -bottom-[50px] will-change-transform"
            style={{ left: `${paw.left}%` }}
          >
            <PawPrint color={paw.color} size="xs" style={{ width: paw.size, height: paw.size }} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
