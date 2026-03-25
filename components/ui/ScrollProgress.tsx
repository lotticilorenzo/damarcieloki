'use client'

import React, { memo } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export const ScrollProgress = memo(function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  
  // Aggiungiamo smorzamento della molla come richiesto per fluidità "premium"
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #D4581A, #2A7A7B)' // Da arancione a teal
      }}
      aria-hidden="true"
    />
  )
})
