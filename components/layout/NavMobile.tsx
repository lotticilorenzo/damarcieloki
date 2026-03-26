'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { PawDivider } from '../ui/PawDivider'

const links = [
  { name: 'Home', href: '/' },
  { name: 'Chi Sono', href: '/chi-sono' },
  { name: 'Servizi', href: '/servizi' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contatti', href: '/contatti' },
]

const menuVariants = {
  closed: { y: '-100%', transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
  open: { y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

const itemVariants = {
  closed: { y: -20, opacity: 0 },
  open: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.2 + i * 0.05, duration: 0.4, ease: 'easeOut' as const }, // stagger di 0.05s
  }),
}

export function NavMobile() {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <div className="md:hidden">
      {/* Botton Hamburger / X */}
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative z-[60] p-2 flex flex-col justify-center items-center w-12 h-12 outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-full"
        aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
        aria-expanded={isOpen}
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          className="w-7 h-[2px] bg-brown block absolute rounded-full"
          style={{ top: '16px' }}
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className="w-7 h-[2px] bg-brown block absolute rounded-full"
          style={{ top: '24px' }}
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          className="w-7 h-[2px] bg-brown block absolute rounded-full"
          style={{ top: '32px' }}
        />
      </motion.button>

      {/* Fullscreen Slide-Down Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-bg z-[50] flex flex-col items-center min-h-[100dvh] pt-32 pb-12"
          >
            <ul className="flex flex-col items-center gap-10 w-full px-6 flex-grow">
              {links.map((link, i) => (
                <motion.li
                  key={link.name}
                  custom={i}
                  variants={itemVariants}
                >
                  <motion.div
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-[32px] font-heading font-extrabold text-brown tracking-tight hover:text-orange transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </ul>

            <motion.div 
              className="mt-auto pt-8 w-full"
              custom={links.length}
              variants={itemVariants}
            >
              <PawDivider className="scale-75 opacity-90" />
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}
