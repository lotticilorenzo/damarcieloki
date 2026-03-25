'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isReduced, setIsReduced] = useState(false)

  // Gestione sicura per SSR (matchMedia esiste solo su Window)
  useEffect(() => {
    setIsReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  if (isReduced) {
    return <>{children}</>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } }}
        exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
        // Classe flessibile nel layout master
        className="flex-grow flex flex-col w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
