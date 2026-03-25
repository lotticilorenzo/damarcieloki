'use client'
import React, { useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface HoverImageRevealProps {
  children: React.ReactNode
  imageSrc: string
  className?: string
  rotation?: number
}

export function HoverImageReveal({ children, imageSrc, className, rotation = 5 }: HoverImageRevealProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Settaggi da sito Awwards (Massima reattività, leggero lag naturale)
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    x.set(e.clientX)
    y.set(e.clientY)
  }

  return (
    <span 
      className={cn("inline-block relative z-20", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      
      {/* Render fisso in viewport che segue il mouse */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          scale: isHovered ? 1 : 0.5,
          rotate: isHovered ? rotation : -10 
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x,
          y,
          translateX: '-50%',
          translateY: '-110%', // Posizionata sopra il cursore per non ostacolare i click
          pointerEvents: 'none',
          zIndex: 9999
        }}
        className="w-[180px] h-[220px] md:w-[260px] md:h-[320px] rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(106,58,42,0.2)] border-4 border-white origin-bottom will-change-transform"
      >
        <Image 
          src={imageSrc} 
          alt="Preview Servizio" 
          fill 
          className="object-cover"
        />
      </motion.div>
    </span>
  )
}
