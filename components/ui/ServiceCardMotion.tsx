'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ServiceCardMotionProps {
  children: React.ReactNode
  index: number
  isBagno: boolean
  className?: string
}

const tiltDir = ['-1.5deg', '1.5deg', '-1deg', '1deg', '-1.5deg']

export function ServiceCardMotion({
  children,
  index,
  isBagno,
  className
}: ServiceCardMotionProps) {
  
  const cardBorderDynamicClass = isBagno 
    ? "hover:border-2 hover:[animation:soap-border_3s_linear_infinite]" 
    : "hover:border-2 hover:border-orange/20"

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    },
    hover: {
      y: -8,
      rotate: tiltDir[index % tiltDir.length],
      boxShadow: '0 24px 40px rgba(106, 58, 42, 0.12)',
      transition: { type: 'spring' as const, stiffness: 300, damping: 18 }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: '-40px' }}
      className={cn(
        "relative flex flex-col h-full bg-white rounded-[20px] p-[28px] shadow-[0_4px_20px_rgba(106,58,42,0.06)] border border-border group transition-[border-color,border-width] duration-300 transform-gpu cursor-pointer",
        {
          "backface-hidden": true, // Previene blur su testo durante trasformazioni 3D
          "will-change-transform": true
        },
        cardBorderDynamicClass,
        className
      )}
    >
      {children}
    </motion.div>
  )
}
