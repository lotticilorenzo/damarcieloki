'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface ParallaxImageProps extends ImageProps {
  containerClassName?: string
  overlayClassName?: string
}

export function ParallaxImage({ containerClassName, overlayClassName, priority, ...props }: ParallaxImageProps & { priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  // Immagine si muove verticlamente del +/- 15% rispetto al container
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])

  return (
    <div 
      ref={ref}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      {/* Curtain Reveal */}
      <motion.div 
        initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
        whileInView={!priority ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" } : undefined}
        animate={priority ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" } : undefined}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: priority ? 0.3 : 0 }}
        className="absolute inset-[-15%]" // Deve sbordare per permettere il parallax senza mostrare il bordo vuoto
      >
        <motion.div style={{ y }} className="relative w-full h-full will-change-transform">
          <Image priority={priority} {...props} />
          {overlayClassName && <div className={cn("absolute inset-0", overlayClassName)} />}
        </motion.div>
      </motion.div>
    </div>
  )
}
