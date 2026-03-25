'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  text: string
  speed?: number // durata in secondi per loop
  className?: string
  textClassName?: string
}

export function MarqueeText({ text, speed = 25, className, textClassName }: MarqueeProps) {
  // Array lungo per riempire anche gli schermi ultra-wide senza vuoti
  const content = Array(8).fill(text)
  
  return (
    <div className={cn("relative overflow-hidden flex whitespace-nowrap border-y-2 border-border/80", className)}>
      <motion.div
        className="flex whitespace-nowrap items-center will-change-transform"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
      >
        {content.map((item, i) => (
          <div key={i} className={cn("px-6 flex items-center gap-12", textClassName)}>
            <span>{item}</span>
            <span className="opacity-30">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
