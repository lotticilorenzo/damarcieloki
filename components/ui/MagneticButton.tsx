'use client'

import React, { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({ children, className, strength = 0.4 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    if (!ref.current) return
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    // Calcolo distanza tra centro del bottone e cursore
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * strength, y: middleY * strength })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  // Springs per fluidità assoluta come i siti Awwwards
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const xTitle = useSpring(0, springConfig)
  const yTitle = useSpring(0, springConfig)

  // Aggiorniamo le springs quando position cambia
  React.useEffect(() => {
    xTitle.set(position.x)
    yTitle.set(position.y)
  }, [position, xTitle, yTitle])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: xTitle, y: yTitle }}
      className={cn("w-fit inline-block will-change-transform z-20 relative", className)}
    >
      {children}
    </motion.div>
  )
}
