'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr/WhatsappLogo'

export function WhatsAppFAB() {
  const wiggleControls = useAnimation()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [showBadge, setShowBadge] = useState(false)

  useEffect(() => {
    // 1. Il timeout a 8000ms scatena il primo wiggle
    const initialTimeout = setTimeout(() => {
      wiggleControls.start({
        rotate: [0, -8, 8, -8, 0],
        transition: { duration: 0.5 }
      })
      
      const loopInterval = setInterval(() => {
        wiggleControls.start({
          rotate: [0, -8, 8, -8, 0],
          transition: { duration: 0.5 }
        })
      }, 12000)

      intervalRef.current = loopInterval
    }, 8000)

    // 2. Notifica fake "1" dopo 5s
    const badgeTimeout = setTimeout(() => {
      setShowBadge(true)
    }, 5000)

    // 3. Sparisce dopo altri 10s (totale 15s)
    const badgeDismissTimeout = setTimeout(() => {
      setShowBadge(false)
    }, 15000)

    return () => {
      clearTimeout(initialTimeout)
      clearTimeout(badgeTimeout)
      clearTimeout(badgeDismissTimeout)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [wiggleControls])

  return (
    <motion.div
      className="fixed bottom-[24px] right-[24px] z-50"
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="relative">
        <AnimatePresence>
          {showBadge && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-orange text-white text-[11px] font-bold flex items-center justify-center rounded-full shadow-sm z-10 select-none border-2 border-white"
            >
              1
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href="https://wa.me/393759893189?text=Ciao+Marci!+Vorrei+prenotare+per+il+mio+cane"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contatta Marci su WhatsApp"
          animate={wiggleControls}
          whileHover={{ 
            scale: 1.1,
            transition: { type: 'spring', stiffness: 400, damping: 17 }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowBadge(false)}
          className="flex items-center justify-center w-[56px] h-[56px] bg-white rounded-full shadow-[0_12px_32px_rgba(106,58,42,0.18)] hover:shadow-[0_16px_48px_rgba(106,58,42,0.25)] border border-border outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 transition-shadow"
        >
          <WhatsappLogo size={32} weight="fill" color="#25D366" />
        </motion.a>
      </div>
    </motion.div>
  )
}
