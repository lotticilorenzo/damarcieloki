'use client'

import React, { useEffect, useState, startTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SpeakerHigh } from '@phosphor-icons/react/dist/ssr/SpeakerHigh'
import { SpeakerSlash } from '@phosphor-icons/react/dist/ssr/SpeakerSlash'
import { cn } from '@/lib/utils'

export function SoundToggle() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const saved = localStorage.getItem('damarci_sound')
    setIsEnabled(saved === 'on')
  }, [])

  const toggleSound = () => {
    startTransition(() => {
      const newState = !isEnabled
      setIsEnabled(newState)
      localStorage.setItem('damarci_sound', newState ? 'on' : 'off')
      
      // Suono di prova al click se abilitato
      if (newState) {
        // Import dinamico per evitare problemi SSR o cicli
        import('@/lib/sounds').then(({ soundManager }) => {
          soundManager.playPop()
        })
      }
    })
  }

  if (!isMounted) return null

  return (
    <div className="fixed bottom-[24px] left-[24px] z-50 flex items-center gap-3 group">
      {/* Tooltip */}
      <div className="absolute left-full ml-3 px-2 py-1 bg-brown text-white text-[10px] font-bold uppercase tracking-wider rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        Suoni {isEnabled ? 'on' : 'off'}
      </div>

      <motion.button
        onClick={toggleSound}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "w-10 h-10 rounded-full border flex items-center justify-center transition-colors shadow-sm",
          isEnabled 
            ? "bg-teal-light border-teal text-teal" 
            : "bg-white border-border text-text-muted"
        )}
        aria-label={isEnabled ? "Disattiva suoni" : "Attiva suoni"}
      >
        <AnimatePresence mode="wait">
          {isEnabled ? (
            <motion.div
              key="on"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <SpeakerHigh size={20} weight="bold" />
            </motion.div>
          ) : (
            <motion.div
              key="off"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <SpeakerSlash size={20} weight="bold" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
