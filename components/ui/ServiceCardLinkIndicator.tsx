'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function ServiceCardLinkIndicator() {
  return (
    <motion.span 
      variants={{
        hover: { x: 4 }
      }}
      className="ml-[6px] font-mono text-[16px]"
    >
      →
    </motion.span>
  )
}
